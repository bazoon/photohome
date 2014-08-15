require 'spec_helper'
include Warden::Test::Helpers
# include Rails.application.routes.url_helpers
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
 
    expect(page).to have_content("Users")
  end

  it "Admin can see novelties page" do
    visit 'admin/novelties'
    expect(page).to have_content(I18n.t("novelties_"))
  end

  it "Admin can see articles page" do
    visit 'admin/articles' 
    expect(page).to have_content(I18n.t("articles_"))
  end

  it "Admin can see novelties page" do
    visit 'admin/photos'
    expect(page).to have_content(I18n.t("last_photos")) 
  end

  it "Admin can see albums page" do
    visit 'admin/albums'
    expect(page).to have_content(I18n.t("admin.albums.index.title")) 
  end
 
  it "Admin can see settings page" do
    visit 'admin/settings'
    expect(page).to have_content(I18n.t("admin.settings.index.title")) 
  end

  it "Admin can see messages" do
    visit 'admin/messages'
    expect(page).to have_content(I18n.t("admin.messages.index.title")) 
  end

  it "Admin can see topics" do
    visit 'admin/topics' 
    expect(page).to have_content(I18n.t("admin.topics.index.title")) 
  end

  it "Admin can see competitions" do
    visit 'admin/competitions'
    expect(page).to have_content(I18n.t("admin.competitions.index.title")) 
  end

  it "Admin can see age_policies" do
    visit 'admin/age_policies'
    expect(page).to have_content(I18n.t("admin.age_policies.index.title")) 
  end

  it "Admin can see banners" do
    visit 'admin/banners'
    expect(page).to have_content(I18n.t("admin.banners.index.title")) 
  end

  it "Admin can see banner_placements" do
    visit 'admin/banner_placements'
    expect(page).to have_content(I18n.t("admin.banner_placements.index.title")) 
  end




end