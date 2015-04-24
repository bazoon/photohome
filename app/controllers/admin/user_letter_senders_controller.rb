class Admin::UserLetterSendersController < ApplicationController
  
  def show
    @user = User.friendly.find(params[:user_id])
    respond_to do |format|
      format.js
    end
  end


end
