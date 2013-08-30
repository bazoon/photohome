class AddPublishedToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :published, :boolean
  end
end
