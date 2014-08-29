module AlbumHelper

	def cache_key_last_photos
    count          = AlbumPhoto.count
    max_updated_at = AlbumPhoto.maximum(:updated_at).try(:utc).try(:to_s, :number)
    "album_photo/all-#{count}-#{max_updated_at}-#{I18n.locale}"
  end

  def cache_key_album_last_photos
    count          = Admin::Album.count
    count1         = AlbumPhoto.count
    max_updated_at = Admin::Album.maximum(:updated_at).try(:utc).try(:to_s, :number)
    "album_photo/all-#{count1}-#{count}-#{max_updated_at}-#{I18n.locale}"
  end

end
