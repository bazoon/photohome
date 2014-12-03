class CreateLetterViews < ActiveRecord::Migration
  def change
    create_table :letter_views do |t|
      t.integer :letter_id
      t.integer :user_id

      t.timestamps
    end
  end
end
