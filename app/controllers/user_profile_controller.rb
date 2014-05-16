class UserProfileController < ApplicationController
	 skip_before_filter :authenticate_user!  
	 layout "user_profile_layout"


	def edit
	  
    @user = User.friendly.find(params[:user_id])

	end

 


end
