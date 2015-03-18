class CreateThemes < ActiveRecord::Migration
  def change
    create_table :themes do |t|
      t.string :name
      t.boolean :used

      t.timestamps
    end
  end
end
