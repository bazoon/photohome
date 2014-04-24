require 'spec_helper'
include Warden::Test::Helpers
Warden.test_mode!


describe "success" do


  let(:admin) do 
    user = FactoryGirl.build(:user)
    user.skip_confirmation!
    user.save!
    user.add_role("admin")
    user
  end

  after(:each) do
    Warden.test_reset!
  end

  before do
    Warden.test_mode!    
    visit new_user_session_path
    fill_in 'user_email', with: admin.email
    fill_in 'user_password', with: 'changeme'
    click_button 'Sign in'
  end


  it "Admin can see a users page" do
    visit '/users'
    page.should have_content("Users")
  end

  it "Admin can see novelties page" do
    visit 'admin/novelties'
    expect(page).to have_content(I18n.t("novelties_"))
  end

  it "Admin can see novelties page" do
    visit 'admin/articles'
    expect(page).to have_content(I18n.t("articles_"))
  end

  it "Admin can see novelties page" do
    visit 'admin/photos'
    expect(page).to have_content(I18n.t("last_photos")) 
  end
 


end