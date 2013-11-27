class Article < ActiveRecord::Base
  acts_as_commentable
  scope :random, -> { where("id>=?", (1..count).to_a.sample).first  }

  def first_image_src
    # binding.pry
    doc = Nokogiri::HTML.parse(content)
    imgs = doc.css("img")
    src = imgs[0].attr("src") unless imgs.nil? or imgs.empty?
  end

end
