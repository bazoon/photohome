class AddMaxPhotoCountToNomination < ActiveRecord::Migration
  def change
    add_column :admin_nominations, :max_photo_count, :integer
  end
end
