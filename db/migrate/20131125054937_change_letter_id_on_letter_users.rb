class ChangeLetterIdOnLetterUsers < ActiveRecord::Migration
  def change

    drop_table :letter_users

    create_table :letter_users do |t|
      t.integer :letter_id
      t.integer :user_id

      t.timestamps
    end
  end
end
