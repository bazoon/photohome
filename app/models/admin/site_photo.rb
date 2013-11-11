class Admin::SitePhoto < ActiveRecord::Base
 belongs_to :album, class_name: "Admin::Album"
 belongs_to :photo

 mount_uploader :image, AdminSitePhotoUploader


# Возвращает либо photo пользователя либо image загруженной фотографии

def picture_url(size)
  photo_id.nil? ?  image_url(size) : Photo.find(photo_id).image_url(size)
end

def author
  photo_id.nil? ? "" : Photo.find(photo_id).user.name
end

end
