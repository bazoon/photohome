class AddPermitedNominationCountToCompetitionRequest < ActiveRecord::Migration
  def change
    add_column :competition_requests, :permited_nomination_count, :integer
  end
end
