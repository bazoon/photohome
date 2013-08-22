class Photo < ActiveRecord::Base
	# belongs_to :gallery

  belongs_to :topic

  mount_uploader :image, ImageUploader
	
	acts_as_taggable_on :themes
	# attr_accessible :theme_tokens
	attr_reader :theme_tokens

	def theme_tokens=(tokens)
		# binding.pry
		

     # tags.map! {|tag| {id: tag.id,name: tag.name.mb_chars.upcase}}    



    # self.theme_list = tokens.mb_chars.upcase 
    self.theme_list = tokens

		self.save
    # binding.pry
	end



end
