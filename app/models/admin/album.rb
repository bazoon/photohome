class Admin::Album < ActiveRecord::Base
  has_many :site_photos, dependent: :destroy

  SHOW_COUNT = 4


	def last_photos
		site_photos.last(SHOW_COUNT)
	end

end
