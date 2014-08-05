class IncomingLettersController < ApplicationController

  layout "user_profile_layout"

  before_action :set_user 

  
  def index
    @letters = Letter.includes(:letter_users).joins(:letter_users).where("letter_users.user_id = ?",[@user.id]).order(updated_at: :desc)
  end

  # def show
   
  # end

private
  def set_user
      @user = User.friendly.find(params[:user_id])
  end
end
