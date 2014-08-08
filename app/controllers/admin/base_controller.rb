class Admin::BaseController < ApplicationController
  
  before_filter :verify_permission

  

private

  def verify_permission
    # redirect_to root_path, alert: "Admin area !" current_user && current_user.is_stuff?
    render :text => I18n.t(:access_denied) unless current_user && current_user.is_stuff? 
  end



end