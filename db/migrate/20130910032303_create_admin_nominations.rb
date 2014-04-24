class CreateAdminNominations < ActiveRecord::Migration
  def change
    create_table :admin_nominations do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
