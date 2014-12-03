class AddSeenToLetterView < ActiveRecord::Migration
  def change
    add_column :letter_views, :seen, :boolean, default: false
  end
end
