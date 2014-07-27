class SitePhoto < ActiveRecord::Base
 belongs_to :album, class_name: "Admin::Album"
 belongs_to :photo
 belongs_to :policy, class_name: "Admin::AgePolicy", :foreign_key => 'age_policy_id'
 validates :album_id, :age_policy_id, presence: true
 #TODO: validates :photo_id, presence: true, unless: :image? 

 mount_uploader :image, AdminSitePhotoUploader
 acts_as_commentable


 alias :old_image_url :image_url

	def image?
		image.nil?
	end

	def has_owner?
		photo != nil
	end

	# Возвращает либо photo пользователя либо image загруженной фотографии

	def image_url(size)
	  photo_id.nil? ?  old_image_url(size) : photo.image_url(size)  
	end

	def user
	  photo_id.nil? ? "" : Photo.find(photo_id).user 
	end

	def user_name
    photo.user.full_name if photo
  end

	def age_policy
	  policy || photo && photo.age_policy
	end

	def age_policy_age
	  age_policy && age_policy.age
	end


end
