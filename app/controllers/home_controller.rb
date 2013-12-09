class HomeController < ApplicationController

  def index

    setting = Admin::Setting.includes(:photos).first

    if setting 
    
      @photos = setting.album.site_photos if setting.album
      @novelty = setting.novelty if setting.novelty
      @article_count = setting.article_count || 0
      @last_photos = Photo.last(4) 
      
        
      @first_article = setting.article
      @other_articles = Article.ids(setting.articles)
      

    else



      render text: ""
    end

  end


  def test
    
  end


end
