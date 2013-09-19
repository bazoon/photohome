class CreateJuryRatings < ActiveRecord::Migration
  def change
    create_table :jury_ratings do |t|
      t.integer :user_id
      t.integer :competition_photo_id

      t.timestamps
    end
  end
end
