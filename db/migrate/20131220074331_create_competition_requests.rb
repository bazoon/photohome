class CreateCompetitionRequests < ActiveRecord::Migration
  def change
    create_table :competition_requests do |t|
      t.integer :competition_id
      t.integer :user_id
      t.boolean :approved

      t.timestamps
    end
  end
end
