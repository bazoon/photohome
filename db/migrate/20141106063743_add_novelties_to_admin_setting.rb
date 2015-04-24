class AddNoveltiesToAdminSetting < ActiveRecord::Migration
  def change
    add_column :admin_settings, :novelties, :string
  end
end
