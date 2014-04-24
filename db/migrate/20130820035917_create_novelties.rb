class CreateNovelties < ActiveRecord::Migration
  def change
    create_table :novelties do |t|
      t.string :title
      t.text :content
      t.date :publish_date
      t.boolean :published
      t.integer :user_id

      t.timestamps
    end
  end
end
