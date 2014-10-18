class AuthorController < ApplicationController

	skip_before_filter :authenticate_user!

  def index
  	@users = User.where("photos_count > 0").order(:last_name, :name)
  end


end
