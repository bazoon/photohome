class AlbumPhoto < ActiveRecord::Base
    belongs_to :photo
    accepts_nested_attributes_for :photo 
    belongs_to :album, class_name: "Admin::Album"

    validates :album_id, :photo_id, presence: true
    acts_as_commentable



    def image_url(kind)
        photo.image_url(kind)
    end


end
