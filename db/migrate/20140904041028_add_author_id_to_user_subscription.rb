class AddAuthorIdToUserSubscription < ActiveRecord::Migration
  def change
    add_column :user_subscriptions, :author_id, :integer
  end
end
