class AddVipToAdminJury < ActiveRecord::Migration
  def change
    add_column :admin_juries, :vip, :boolean, default: false
  end
end
