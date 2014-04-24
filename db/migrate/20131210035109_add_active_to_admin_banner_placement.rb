class AddActiveToAdminBannerPlacement < ActiveRecord::Migration
  def change
     add_column :admin_banner_placements, :active, :boolean
  end
end
