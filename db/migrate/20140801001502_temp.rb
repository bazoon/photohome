class Temp < ActiveRecord::Migration
  def change
    remove_column :admin_settings, :adult_image
  end
end
