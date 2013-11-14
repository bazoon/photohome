class HomeController < ApplicationController

  def index

   
    
    @photos = Admin::Setting.includes(album: [:site_photos] ).first.album.site_photos if Admin::Setting.first


  end


  def test
    
  end

end
