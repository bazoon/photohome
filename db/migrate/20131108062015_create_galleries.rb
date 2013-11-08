class CreateGalleries < ActiveRecord::Migration
  def change
    create_table :galleries do |t|
      t.integer :photo_id
      t.string :image
      t.integer :album_id

      t.timestamps
    end
  end
end
