class RenameRequestIdInCompetitionRequestResponse < ActiveRecord::Migration
  def change
      remove_column :admin_competition_request_responses, :request_id
      add_column :admin_competition_request_responses, :competition_request_id, :integer
  end
end
