# require 'spec_helper'
# include Warden::Test::Helpers
# Warden.test_mode!


# describe "User can login" do
 
#   let(:user) do 
#     user = FactoryGirl.build(:user)
#     user.skip_confirmation!
#     user.save!
#     user.add_role("user")
#     user
#   end

#   after(:each) do
#     Warden.test_reset!
#   end

#   # before do
#   #   Warden.test_mode!    
#   #   visit new_user_session_path
#   #   fill_in 'user_email', with: user.email
#   #   fill_in 'user_password', with: 'changeme'
#   #   click_button 'Sign in'
#   # end

#   #Actions a user can't do

#   it "User can't see admin novelties page" do
#     # Warden.test_mode!    
#     visit '/users/sign_in'
#     fill_in 'user_email', with: user.email
#     fill_in 'user_password', with: 'changeme'
    

#     click_button 'Sign in'
#     page.should have_content("Admin area !")
#   end



# end

