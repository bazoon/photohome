class Admin::SitePhoto < ActiveRecord::Base
 belongs_to :album, class_name: "Admin::Album"
 belongs_to :photo
 belongs_to :policy, class_name: "Admin::AgePolicy", :foreign_key => 'age_policy_id'

 mount_uploader :image, AdminSitePhotoUploader

 alias :old_image_url :image_url


# Возвращает либо photo пользователя либо image загруженной фотографии

def image_url(size)
  photo_id.nil? ?  old_image_url(size) : photo.image_url(size)  
end

def user
  photo_id.nil? ? "" : Photo.find(photo_id).user 
end

def age_policy
  policy || photo && photo.age_policy
end

end
