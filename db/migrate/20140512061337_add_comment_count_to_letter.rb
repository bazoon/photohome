class AddCommentCountToLetter < ActiveRecord::Migration
  def change
    add_column :letters, :comments_count, :integer
  end
end
