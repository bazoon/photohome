class RenameAgePolicy < ActiveRecord::Migration
  def change
    rename_table :age_policies, :admin_age_policies
  end
end
