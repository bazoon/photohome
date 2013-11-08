class RenameGallery < ActiveRecord::Migration
  def change
    rename_table :galleries, :site_photos
  end
end
