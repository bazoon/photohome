class MasqueradesController < ApplicationController

  # skip_before_filter :authenticate_user!
  before_action :verify_admin

  def new
    
    session[:admin_id] = current_user.id
    user = User.friendly.find(params[:user_id])
    # sign_out
    sign_in(user)
    
    redirect_to root_path, notice: "Now masquerading as #{user.full_name}"

  end

  def destroy
    user = User.find(session[:admin_id])
    sign_in :user, user
    session[:admin_id] = nil
    redirect_to root_path, notice: 'Stopped masquerading'
  end


  private

  def verify_admin
    redirect_to root_path, notice: 'Go away!' unless authorize_admin
  end


end
