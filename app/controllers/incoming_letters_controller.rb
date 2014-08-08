class IncomingLettersController < ApplicationController

  layout "user_profile_layout"

  before_action :set_user 

  
  def index
    @letters = Letter.includes(:people).joins(:people).where("letter_people.user_id = ?",[@user.id]).order(updated_at: :desc)
  end

  # def show
   
  # end

private
  def set_user
      @user = User.friendly.find(params[:user_id])
  end
end
