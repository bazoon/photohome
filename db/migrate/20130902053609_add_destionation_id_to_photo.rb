class AddDestionationIdToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :destination_id, :integer
  end
end
