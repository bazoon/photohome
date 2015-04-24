class ChangeDescriptionInAdminAlbum < ActiveRecord::Migration
  def change
  	remove_column :admin_albums, :description
  	add_column :admin_albums, :description, :text
  end
end
