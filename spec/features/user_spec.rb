require 'spec_helper'
require 'monkey_rolify'

include Warden::Test::Helpers
Warden.test_mode!

describe "Actions a User can not do" do

  let(:user) do 
    user = FactoryGirl.build(:user)
    user.skip_confirmation!
    user.save!
    user.grant("user") 
    user
  end

  after(:each) do
    Warden.test_reset!
  end

  before do
    Warden.test_mode!    
    visit new_user_session_path
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: 'changeme'
    click_button 'Sign in'
  end

  #Actions a user can't do

  it "User can't see admin novelties page" do
    visit '/admin/novelties'
    page.should have_content("Admin area !")
  end

  it "User can't see admin articles page" do
    visit '/admin/articles'
    page.should have_content("Admin area !")
  end

  it "User can't see admin messages page" do
    visit '/admin/messages'
    page.should have_content("Admin area !")
  end

  it "User can't see admin photos page" do
    visit '/admin/photos'
    page.should have_content("Admin area !")
  end
 
  it "User can't see admin site_photos page" do
    visit '/admin/site_photos'
    page.should have_content("Admin area !")
  end

  it "User can't see admin settings page" do
    visit '/admin/settings'
    page.should have_content("Admin area !")
  end

  it "User can't see admin users page" do
    visit '/admin/articles'
    page.should have_content("Admin area !")
  end

  it "User can't see admin competitions page" do
    visit '/admin/competitions'
    page.should have_content("Admin area !")
  end

  it "User can't see admin topics page" do
    visit '/admin/topics'
    page.should have_content("Admin area !")
  end

  #Actions a user can do

  it "Can see own profile" do
    visit user_profile_path(user_id: user.id, locale: 'ru')
    page.should have_content(user.full_name)
    page.should have_content(I18n.t("photos_"))
    page.should have_content(I18n.t("cloud"))
    page.should have_content(I18n.t("tickets"))
    page.should have_content(I18n.t("sent_letters"))
    page.should have_content(I18n.t("in_letters")) 
    page.should have_content(I18n.t("change_password"))
  end


  it "Can see own photos" do
    visit user_photos_path(user_id: user.id, locale: 'ru')
    page.should have_content(I18n.t("photos_"))
    page.should have_content(I18n.t("photos.index.new"))
  end
 
  it "Can see own cloud" do
    
    User.stub(:current).and_return(user)   
     
    photo = FactoryGirl.build(:photo)
    photo.save
    photo.theme_tokens = "mood town"

    visit user_cloud_path(user_id: user.id, locale: 'ru')
    page.should have_content("mood")
    page.should have_content("town")
  end


  it "Can see own tickets" do
    visit user_messages_path(user_id: user.id, locale: 'ru')
    page.should have_content(I18n.t("messages.index.new"))
    page.should have_content(I18n.t("messages.index.title"))
    page.should have_content(I18n.t("messages.index.content"))
    page.should have_content(I18n.t("messages.index.status"))
    page.should have_content(I18n.t("messages.index.reason"))
  end

  it "Can see own letters" do
    visit user_letters_path(user_id: user.id, locale: 'ru')
    page.should have_content(I18n.t("letters.index.title"))
    page.should have_content(I18n.t("letters.index.recipients"))
    page.should have_content(I18n.t("letters.index.new"))
  end 

  it "Can see incoming letters" do
    visit user_incoming_letters_path(user_id: user.id, locale: 'ru')
    page.should have_content(I18n.t("incoming_letters.index.title"))
    page.should have_content(I18n.t("incoming_letters.index.recipients"))
    page.should have_content(I18n.t("incoming_letters.index.from"))
  end 


end







