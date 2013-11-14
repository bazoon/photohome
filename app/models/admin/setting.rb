class Admin::Setting < ActiveRecord::Base

   belongs_to :album, class_name: "Admin::Album"
   has_many :site_photos, through: :album
   belongs_to :novelty

end
