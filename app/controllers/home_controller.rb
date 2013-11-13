class HomeController < ApplicationController

  def index

    

    @photos = Admin::Setting.first.album.site_photos
  end


end
