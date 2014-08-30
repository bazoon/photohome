class Admin::Album < ActiveRecord::Base
  has_many :album_photos, dependent: :destroy
  has_many :photos, through: :album_photos

  SHOW_COUNT = 4

	def last_photos
		album_photos.last(SHOW_COUNT)
	end

  #!!!optimize this via sql ?
	def authors
		authors = photos.map(&:author_name).compact.uniq
		authors.count == 1 ? authors.first : authors
	end


    def self.import_from_tags(tag_list, album_id)
        
        tags = tag_list.split(",")

        photos = []

        tags.each do |tag|
            photos << Photo.tagged_with(tag, on: "themes").flatten
        end    

        
        photos.flatten!
        photos.uniq!

      

        photos.each do |photo|

            album_photo = AlbumPhoto.new
            album_photo.photo_id = photo.id
            album_photo.album_id = album_id
            
            return false unless album_photo.save
        end

        true

    end



    def self.import_from_selected(photo_ids, album_id)
  
      photo_ids.each do |photo_id| 
          album_photo = AlbumPhoto.new
          album_photo.photo_id = photo_id
          album_photo.album_id = album_id
          return false unless album_photo.save
      end

      true
    end

end
