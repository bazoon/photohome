class AddNominationIdToCompetitionPhoto < ActiveRecord::Migration
  def change
    add_column :competition_photos, :nomination_id, :integer
  end
end
