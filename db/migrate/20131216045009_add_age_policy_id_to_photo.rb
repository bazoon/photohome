class AddAgePolicyIdToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :age_policy_id, :integer
  end
end
