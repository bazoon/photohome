class CreateLetterUsers < ActiveRecord::Migration
  def change
    create_table :letter_users do |t|
      t.integer :letter_ir
      t.integer :user_id

      t.timestamps
    end
  end
end
