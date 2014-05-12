class AuthorController < ApplicationController

  def index
  	@users = User.all
  end


end
