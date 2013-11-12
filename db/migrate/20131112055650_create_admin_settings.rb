class CreateAdminSettings < ActiveRecord::Migration
  def change
    create_table :admin_settings do |t|
      t.integer :album_id
      t.integer :novelty_id
      t.timestamps
    end
  end
end
