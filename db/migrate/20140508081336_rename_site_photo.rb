class RenameSitePhoto < ActiveRecord::Migration
  def change
  	rename_table :admin_site_photos, :site_photos
  end
end
