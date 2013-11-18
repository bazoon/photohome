class Novelty < ActiveRecord::Base
	belongs_to :user
  acts_as_commentable

	self.per_page = 10


  def first_image_src
    # binding.pry
    doc = Nokogiri::HTML.parse(content)
    src = doc.css("img")[0].attr("src")
  end


end