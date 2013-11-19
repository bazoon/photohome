class HomeController < ApplicationController

  def index

    setting = Admin::Setting.includes(:photos).first

    if setting 
    
      @photos = setting.album.site_photos if setting.album
      @novelty = setting.novelty if setting.novelty
      @last_photos = Photo.last(4) 

      random_article = Admin::Article.random    
      @article = random_article if random_article.class == Admin::Article

    else



      render text: ""
    end

  end


  def test
    
  end


end
