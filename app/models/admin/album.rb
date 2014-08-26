class Admin::Album < ActiveRecord::Base
  has_many :site_photos, dependent: :destroy

  SHOW_COUNT = 4

	def last_photos
		site_photos.last(SHOW_COUNT)
	end

  #!!!optimize this via sql ?
	def authors
		site_photos.includes(:user,:photo
			).map(&:author).compact.uniq
		# SitePhoto.find(site_photos.ids) #.pluck(:author)
		# SitePhoto.find_by_sql("select author from site_photos where id in (#{site_photos.ids.split(",")} )")
		# SitePhoto.where(id: site_photos.ids).pluck(:user_name)
	end


    def self.import_from_tags(tag_list, album_id)
        photos = Photo.tagged_with(tag_list, on: "themes")
        
        photos.each do |photo|
            site_photo = SitePhoto.new
            site_photo.title = photo.title
            site_photo.age_policy_id = photo.age_policy_id
            site_photo.photo_id = photo.id
            site_photo.album_id = album_id
            return false unless site_photo.save
        end

        true

    end

end
