class RemoveActiveFromAdminBanner < ActiveRecord::Migration
  def change
     remove_column :admin_banners, :active, :boolean
  end
end
