class AddDelayedJobIdToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :delayed_job_id, :integer
  end
end
