class AddDescriptionToAdminAlbum < ActiveRecord::Migration
  def change
    add_column :admin_albums, :description, :string
  end
end
