class SitePhoto < ActiveRecord::Base

 include PhotoAgePolicy

 belongs_to :album, class_name: "Admin::Album"
 belongs_to :photo
 belongs_to :policy, class_name: "Admin::AgePolicy", :foreign_key => 'age_policy_id'
 belongs_to :user



 validates :album_id, :age_policy_id, presence: true

 #TODO: validates :photo_id, presence: true, unless: :image? 

 mount_uploader :image, AdminSitePhotoUploader
 acts_as_commentable


 alias :old_user :user 


 alias :old_image_url :image_url

 	def user
	  return old_user if old_user
	  photo_id.nil? ? nil : Photo.find(photo_id).user
	end

	def image?
		image.nil?
	end

	# Возвращает либо photo пользователя либо image загруженной фотографии

	def image_url(size)
	  photo_id.nil? ?  old_image_url(size) : photo.image_url(size)  
	end


	def author
  	return user.full_name if user
  	photo.nil? ? user_name : photo.user.full_name 
  end

	def age_policy
	  policy || photo && photo.age_policy
	end

	def age_policy_age
	  age_policy && age_policy.age
	end

	def theme_tags
		photo && photo.theme_tags
	end


end
