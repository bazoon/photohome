class PhotoAgePolicy


	def self.image_for_user(user, photo, image_kind)
		return	photo.image_url(image_kind) if user.age >= 16
   	""
  end


end