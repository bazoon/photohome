class Admin::Album < ActiveRecord::Base
  has_many :site_photos, dependent: :destroy
  has_many :album_photos, dependent: :destroy
  has_many :photos, through: :album_photos

  SHOW_COUNT = 4

	def last_photos
		photos.last(SHOW_COUNT)
	end

  #!!!optimize this via sql ?
	def authors
		photos.includes(:user).map(&:author_name).compact.uniq
		# SitePhoto.find(site_photos.ids) #.pluck(:author)
		# SitePhoto.find_by_sql("select author from site_photos where id in (#{site_photos.ids.split(",")} )")
		# SitePhoto.where(id: site_photos.ids).pluck(:user_name)
	end


    def self.import_from_tags(tag_list, album_id)
        
        tags = tag_list.split(",")

        photos = []

        tags.each do |tag|
            photos << Photo.tagged_with(tag, on: "themes").uniq
        end    

        photos.uniq.each do |photo|
            site_photo = SitePhoto.new
            site_photo.title = photo.title
            site_photo.age_policy_id = photo.age_policy_id
            site_photo.photo_id = photo.id
            site_photo.album_id = album_id
            return false unless site_photo.save
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
