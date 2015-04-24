class AddShowMainHeaderToAdminSetting < ActiveRecord::Migration
  def change
    add_column :admin_settings, :show_main_header, :boolean, default: true
  end
end
