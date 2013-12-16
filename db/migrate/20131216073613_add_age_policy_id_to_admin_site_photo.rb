class AddAgePolicyIdToAdminSitePhoto < ActiveRecord::Migration
  def change
    add_column :admin_site_photos, :age_policy_id, :integer
  end
end
