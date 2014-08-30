class Admin::SettingDecorator 
  
  attr_reader :setting
  attr_reader :photos, :novelty, :first_article, :other_articles, :album, :authors

  def initialize(setting)
    @setting = setting
    
    if setting
	    @photos = @setting.photos if @setting.album
	    @novelty = @setting.novelty if @setting.novelty
	    @first_article = @setting.article
	    @other_articles = Article.selected_ids(@setting.articles)
      @album = @setting.album
      @authors = @album.authors
      
	  end    

  end

  def album_title
    album && album.title
  end
  
  
end