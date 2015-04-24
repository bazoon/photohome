class AddIndexForUserNames < ActiveRecord::Migration
  def change
    add_index :users, [:last_name, :name]
  end
end
