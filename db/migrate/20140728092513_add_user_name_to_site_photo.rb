class AddUserNameToSitePhoto < ActiveRecord::Migration
  def change
    add_column :site_photos, :user_name, :string
  end
end
