class AddDigestToNovelty < ActiveRecord::Migration
  def change
    add_column :novelties, :digest, :text
  end
end
