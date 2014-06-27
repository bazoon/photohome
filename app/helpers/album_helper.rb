module AlbumHelper

	def cache_key_last_photos
    count          = SitePhoto.count
    max_updated_at = SitePhoto.maximum(:updated_at).try(:utc).try(:to_s, :number)
    "site_photo/all-#{count}-#{max_updated_at}"
  end

  def cache_key_album_last_photos
    count          = Admin::Album.count
    count1         = SitePhoto.count
    max_updated_at = Admin::Album.maximum(:updated_at).try(:utc).try(:to_s, :number)
    "site_photo/all-#{count1}-#{count}-#{max_updated_at}"
  end

end
