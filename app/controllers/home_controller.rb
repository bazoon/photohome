class HomeController < ApplicationController

  def index

    setting = Admin::Setting.includes(album: [:site_photos]).first

    if setting 
    
      @photos = setting.album.site_photos if Admin::Setting.first
      @novelty = setting.novelty
      @last_photos = Photo.last(4)      

    else



      render text: ""
    end

  end


  def test
    
  end

end
