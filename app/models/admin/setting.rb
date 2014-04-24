class Admin::Setting < ActiveRecord::Base

   belongs_to :album, class_name: "Admin::Album"
   has_many :site_photos, through: :album
   has_many :photos, through: :site_photos
   belongs_to :novelty
   belongs_to :article


   

end
