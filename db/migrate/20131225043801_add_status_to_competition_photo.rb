class AddStatusToCompetitionPhoto < ActiveRecord::Migration
  def change
    add_column :competition_photos, :status, :integer
  end
end
