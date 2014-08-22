class Article < Post
  acts_as_commentable

  scope :random, lambda {|n| where("id in (?)", all.map(&:id).to_a.sample(n))  }

  scope :selected_ids, lambda {|s| s.nil? ? Article.none :  where("id in (?)", s.split(",")) }


  def first_image_src
    # binding.pry
    doc = Nokogiri::HTML.parse(content)
    imgs = doc.css("img")
    src = imgs[0].attr("src") unless imgs.nil? or imgs.empty?
  end

  #Move article to main page
  def promote_as_main
    setting = Admin::Setting.first
    setting.article = self
    setting.save!
  end

  def promoted?
    setting = Admin::Setting.first
    setting && setting.article && setting.article.id == self.id
  end




end
