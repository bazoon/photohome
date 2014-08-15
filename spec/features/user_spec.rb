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
    save_and_open_page 
    page.should have_content(I18n.t(:access_denied))
  end

  it "User can't see admin articles page" do
    visit '/admin/articles'
    page.should have_content(I18n.t(:access_denied))
  end

  it "User can't see admin messages page" do
    visit '/admin/messages'
    page.should have_content(I18n.t(:access_denied))
  end

  it "User can't see admin photos page" do
    visit '/admin/photos'
    page.should have_content(I18n.t(:access_denied))
  end
 
  it "User can't see admin albums page" do
    visit '/admin/albums'
    page.should have_content(I18n.t(:access_denied))
  end

  it "User can't see admin settings page" do
    visit '/admin/settings'
    page.should have_content(I18n.t(:access_denied))
  end

  it "User can't see admin users page" do
    visit '/admin/articles'
    page.should have_content(I18n.t(:access_denied))
  end

  it "User can't see admin competitions page" do
    visit '/admin/competitions'
    page.should have_content(I18n.t(:access_denied))
  end

  it "User can't see admin topics page" do
    visit '/admin/topics'
    page.should have_content(I18n.t(:access_denied))
  end

  #Actions a user can do

  

end







