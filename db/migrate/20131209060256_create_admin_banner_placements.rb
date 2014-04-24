class CreateAdminBannerPlacements < ActiveRecord::Migration
  def change
    create_table :admin_banner_placements do |t|
      t.integer :banner_id
      t.integer :place_id
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
