class Admin::SettingDecorator 
  
  attr_reader :setting
  attr_reader :photos, :novelty, :first_article, :other_articles,
              :album, :authors, :other_novelties, :show_main_header

  def initialize(setting)
    @setting = setting
    
    if setting
	    @photos = @setting.photos if @setting.album
	    @novelty = @setting.novelty if @setting.novelty
	    @first_article = @setting.article
	    @other_articles = Article.selected_ids(@setting.articles)
      @other_novelties = Novelty.selected_ids(@setting.novelties)
      @album = @setting.album
      @authors = @album.authors if @album
      @show_main_header = @setting.show_main_header      
	  end    

  end

  def album_title
    album && album.title
  end
  
  
end