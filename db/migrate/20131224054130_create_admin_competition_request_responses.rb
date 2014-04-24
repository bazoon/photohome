class CreateAdminCompetitionRequestResponses < ActiveRecord::Migration
  def change
    create_table :admin_competition_request_responses do |t|
      t.integer :request_id
      t.integer :response_id

      t.timestamps
    end
  end
end
