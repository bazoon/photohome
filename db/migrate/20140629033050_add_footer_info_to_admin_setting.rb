class AddFooterInfoToAdminSetting < ActiveRecord::Migration
  def change
    add_column :admin_settings, :footer, :text
  end
end
