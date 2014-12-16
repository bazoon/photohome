class AuthorController < ApplicationController

	skip_before_filter :authenticate_user!

  def index
  	@users = User.order(:last_name, :name).paginate(:page => params[:page],per_page: 12)
  end


end
