class DefaultResponseIdForCompetitionRequest < ActiveRecord::Migration
  def change
    change_table :competition_requests do |t|
      t.change_default :response_id, 0
    end

  end
end
