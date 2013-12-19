class AddAgePolicyIdToPost < ActiveRecord::Migration
  def change
    add_column :posts, :age_policy_id, :integer
  end
end
