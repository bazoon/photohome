class AddTitleToAdminSitePhoto < ActiveRecord::Migration
  def change
    add_column :admin_site_photos, :title, :string
  end
end
