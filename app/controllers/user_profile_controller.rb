class UserProfileController < ApplicationController
	 
	 layout "user_profile_layout"


	def edit
	  
    @user = User.find(params[:user_id])

	end

 


end
