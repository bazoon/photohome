class ChangeTypesForPost < ActiveRecord::Migration
  def change
     change_column :posts, :content, :text
     change_column :posts, :digest, :text
  end
end
