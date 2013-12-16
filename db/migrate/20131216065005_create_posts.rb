class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :content
      t.boolean :published
      t.integer :user_id
      t.string :digest

      t.timestamps
    end
  end
end
