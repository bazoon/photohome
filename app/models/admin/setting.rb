class Admin::Setting < ActiveRecord::Base

   belongs_to :album, class_name: "Admin::Album"
   has_many :album_photos, through: :album
   has_many :photos, through: :album_photos
   belongs_to :novelty
   belongs_to :article

   mount_uploader :adult_image, AdminAdultImageUploader

   def self.footer
   	setting = Admin::Setting.first
   	setting && setting.footer
   end

   def self.adult_image_url(kind)
		return @@adult_image_url if defined? @@adult_image_url
		setting = Admin::Setting.first
		@@adult_image_url = setting && setting.adult_image_url(kind)
   end

end
