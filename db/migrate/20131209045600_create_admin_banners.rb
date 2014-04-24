class CreateAdminBanners < ActiveRecord::Migration
  def change
    create_table :admin_banners do |t|
      t.string :image
      t.string :link

      t.timestamps
    end
  end
end
