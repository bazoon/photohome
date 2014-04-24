class CreateAdminJuries < ActiveRecord::Migration
  def change
    create_table :admin_juries do |t|
      t.integer :competition_id
      t.integer :user_id

      t.timestamps
    end
  end
end
