require 'spec_helper'
include Warden::Test::Helpers
Warden.test_mode!


describe "User can login" do
 
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
    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: 'changeme'
    click_button 'Sign in'
  end

  #Actions a user can't do

  
  it "User can't see users" do
    visit '/users'
    expect(page).to have_content(I18n.t(:access_denied))
  end

it "User can see novelties page" do
    visit 'admin/novelties'
    expect(page).to have_content(I18n.t(:access_denied))
  end

  it "User can see articles page" do
    visit 'admin/articles' 
    expect(page).to have_content(I18n.t(:access_denied))
  end

  it "User can see novelties page" do
    visit 'admin/photos'
    expect(page).to have_content(I18n.t(:access_denied)) 
  end

  it "User can see albums page" do
    visit 'admin/albums'
    expect(page).to have_content(I18n.t(:access_denied)) 
  end
 
  it "User can see settings page" do
    visit 'admin/settings'
    expect(page).to have_content(I18n.t(:access_denied)) 
  end
 
  it "User can see messages" do
    visit 'admin/messages'
    expect(page).to have_content(I18n.t(:access_denied)) 
  end

  it "User can see topics" do
    visit 'admin/topics' 
    expect(page).to have_content(I18n.t(:access_denied)) 
  end

  it "User can see competitions" do
    visit 'admin/competitions'
    expect(page).to have_content(I18n.t(:access_denied)) 
  end

  it "User can see age_policies" do
    visit 'admin/age_policies'
    expect(page).to have_content(I18n.t(:access_denied)) 
  end

  it "User can see banners" do
    visit 'admin/banners'
    expect(page).to have_content(I18n.t(:access_denied)) 
  end

  it "User can see banner_placements" do
    visit 'admin/banner_placements'
    expect(page).to have_content(I18n.t(:access_denied)) 
  end





end

