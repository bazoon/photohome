class AddAdultImageToAdminSetting < ActiveRecord::Migration
  def change
  	add_column :admin_settings, :adult_image, :string
  end
end
