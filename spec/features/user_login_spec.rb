require 'spec_helper'
include Warden::Test::Helpers
Warden.test_mode!


describe "User can login" do
 
  let(:user) do 
    user = FactoryGirl.build(:user)
    user.skip_confirmation!
    user.save!
    user.add_role("admin")
    user
  end

  after(:each) do
    Warden.test_reset!
  end

  # before do
  #   Warden.test_mode!    
  #   visit new_user_session_path
  #   fill_in 'user_email', with: user.email
  #   fill_in 'user_password', with: 'changeme'
  #   click_button 'Sign in'
  # end

  #Actions a user can't do

  # it "User can't see admin novelties page", :js => true do
  it "User can't see admin novelties page" do
    Warden.test_mode!     
    login_as(user, :scope => :user)
    visit '/competitions' 
    # visit '/users/sign_in'
    # fill_in 'user_email', with: user.email
    # fill_in 'user_password', with: 'changeme'
    # click_button 'Sign in'
    # save_and_open_page
    page.should have_content("Управление")
  end



end

