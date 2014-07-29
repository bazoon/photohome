class AddUserIdToSitePhoto < ActiveRecord::Migration
  def change
    add_column :site_photos, :user_id, :integer
  end
end
