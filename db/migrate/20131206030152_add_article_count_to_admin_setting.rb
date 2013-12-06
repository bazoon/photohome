class AddArticleCountToAdminSetting < ActiveRecord::Migration
  def change
    add_column :admin_settings, :article_count, :integer
  end
end
