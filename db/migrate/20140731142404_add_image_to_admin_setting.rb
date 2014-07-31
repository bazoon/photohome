class AddImageToAdminSetting < ActiveRecord::Migration
  def change
    add_column :admin_settings, :adult_image, :string
    remove_column :admin_settings, :image
  end
end
