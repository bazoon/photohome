class AddArticleIdToAdminSetting < ActiveRecord::Migration
  def change
    add_column :admin_settings, :article_id, :integer
  end
end
