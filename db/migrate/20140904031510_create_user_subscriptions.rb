class CreateUserSubscriptions < ActiveRecord::Migration
  def change
    create_table :user_subscriptions do |t|
      t.integer :kind
      t.integer :user_id

      t.timestamps
    end
  end
end
