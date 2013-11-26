class AddSeenToLetters < ActiveRecord::Migration
  def change
    add_column :letters, :seen, :boolean, default: false
  end
end
