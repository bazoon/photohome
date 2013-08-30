class Admin::BaseController < ApplicationController
  before_filter :verify_is_stuff



private

  def verify_is_stuff
    redirect_to root_path,alert: "Admin area !" unless current_user && current_user.is_stuff?
  end



end