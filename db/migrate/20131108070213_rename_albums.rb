class RenameAlbums < ActiveRecord::Migration
  def change
    rename_table :albums, :admin_albums
  end
end
