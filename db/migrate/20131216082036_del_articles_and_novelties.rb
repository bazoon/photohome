class DelArticlesAndNovelties < ActiveRecord::Migration
  def change
    drop_table :novelties
    drop_table :articles
  end
end
