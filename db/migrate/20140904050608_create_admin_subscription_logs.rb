class CreateAdminSubscriptionLogs < ActiveRecord::Migration
  def change
    create_table :admin_subscription_logs do |t|
      t.string :resource
      t.integer :resource_id
      t.date :sent
      t.integer :user_id

      t.timestamps
    end
  end
end
