class AddSeenToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :seen, :boolean,default: false
  end
end
