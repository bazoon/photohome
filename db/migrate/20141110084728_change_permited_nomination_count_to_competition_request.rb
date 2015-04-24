class ChangePermitedNominationCountToCompetitionRequest < ActiveRecord::Migration
  def change
    remove_column :competition_requests, :permited_nomination_count
    add_column :competition_requests, :permited_nomination_count, :integer, default: 0
  end
end
