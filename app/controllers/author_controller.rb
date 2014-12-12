class AuthorController < ApplicationController

	skip_before_filter :authenticate_user!

  def index
  	@users = User.where("photos_count > 0").order(:name, :last_name).paginate(:page => params[:page],per_page: 12)
  end


end
