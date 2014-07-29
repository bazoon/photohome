class Admin::SettingDecorator 
  
  attr_reader :setting
  attr_reader :photos, :novelty, :first_article, :other_articles, :album

  def initialize(setting)
    @setting = setting
    
    if setting
	    @photos = @setting.site_photos if @setting.album
	    @novelty = @setting.novelty if @setting.novelty
	    @first_article = @setting.article
	    @other_articles = Article.ids(@setting.articles)
      @album = @setting.album
	  end    



  end

  
  
end