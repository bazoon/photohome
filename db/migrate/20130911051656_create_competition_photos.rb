class CreateCompetitionPhotos < ActiveRecord::Migration
  def change
    create_table :competition_photos do |t|
      t.integer :photo_id
      t.integer :competition_id

      t.timestamps
    end
  end
end
