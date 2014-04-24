class AddResponseFieldsToCompetitionRequest < ActiveRecord::Migration
  def change
    add_column :competition_requests, :response_id, :integer
    add_column :competition_requests, :answer, :text
  end
end
