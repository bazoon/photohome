class AddSidekiqIdToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :sidekiq_id, :string
  end
end
