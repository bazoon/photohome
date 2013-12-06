class AddArticlesToAdminSetting < ActiveRecord::Migration
  def change
    add_column :admin_settings, :articles, :string
  end
end
