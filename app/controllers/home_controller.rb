class HomeController < ApplicationController

  def index

    setting = Admin::Setting.includes(album: [:site_photos]).first

    if setting 
    
      @photos = setting.album.site_photos if setting.album
      @novelty = setting.novelty if setting.novelty
      @last_photos = Photo.last(4)      
      @article = Admin::Article.random

    else



      render text: ""
    end

  end


  def test
    
  end


end
