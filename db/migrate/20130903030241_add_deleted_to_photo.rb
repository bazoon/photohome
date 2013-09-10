class AddDeletedToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :deleted, :boolean,default: false
  end
end
