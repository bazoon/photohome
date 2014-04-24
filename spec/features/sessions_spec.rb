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

  let(:user) do 
    user = FactoryGirl.build(:user)
    user.skip_confirmation!
    user.save!
    user.add_role("user")
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
    # login_as user, scope: :user
    # visit '/articles/list'
    visit '/users'
    # print page.html
    # save_and_open_page
    # user.name.should == "vit"
    # user.persisted?.should == true
    page.should have_content("Users")
  end

  # it "it does not displays a  Users page" do
  #   login_as user
  #   visit '/users'
  #   expect(page).to have_content(I18n.t("devise.failure.unauthenticated"))
  # end

 


end