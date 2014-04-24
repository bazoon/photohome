class AddTitleToAdminBanner < ActiveRecord::Migration
  def change
    add_column :admin_banners, :title, :string
    add_column :admin_banners, :active, :boolean
  end
end
