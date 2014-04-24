class RenameSitePhotoTable < ActiveRecord::Migration
  def change
    rename_table :site_photos, :admin_site_photos
  end
end
