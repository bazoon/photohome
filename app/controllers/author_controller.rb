class AuthorController < ApplicationController

	skip_before_filter :authenticate_user!

  def index
  	# @users = User.order(:last_name, :name).paginate(:page => params[:page],per_page: 12)

    @clubers = User.with_role("cluber").order(:last_name, :name)
    @pre_clubers = User.with_role("pre_cluber").order(:last_name, :name)
    @vips = User.with_role("VIP").order(:last_name, :name)
    @friends = User.with_role("Friend").order(:last_name, :name)
    @guests = User.without_role.order(:last_name, :name)

  end


end
