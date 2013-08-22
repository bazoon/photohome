class HomeController < ApplicationController

  def index
    @last_photos = Photo.last(3)
  end


end
