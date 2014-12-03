class IncomingLettersController < ApplicationController

  layout "user_profile_layout"

  before_action :set_user 

  
  def index
    @letters = Letter.incoming_for(@user)
    
  end

  # def show
   
  # end

private
  def set_user
    @user = User.friendly.find(params[:user_id])
  end
end
