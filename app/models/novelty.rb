class Novelty < ActiveRecord::Base
	belongs_to :user
  acts_as_commentable


	self.per_page = 10

  def user_name
    user && user.name
  end


  def first_image_src
    # binding.pry
    doc = Nokogiri::HTML.parse(content)
    imgs = doc.css("img")
    src = imgs[0].attr("src") unless imgs.nil? or imgs.empty?
  end


end