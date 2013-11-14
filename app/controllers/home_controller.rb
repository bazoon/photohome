class HomeController < ApplicationController

  def index

   
    
    @photos = Admin::Setting.first.album.site_photos if Admin::Setting.first


  end


  def test
    
  end

end
