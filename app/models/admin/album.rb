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

end
