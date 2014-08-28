class AlbumPhoto < ActiveRecord::Base
    belongs_to :photo, class_name: "Photo"
    accepts_nested_attributes_for :photo 
    belongs_to :album, class_name: "Admin::Album"

end
