class SetDefaultApprovedForCompetitionRequests < ActiveRecord::Migration
  def change

     change_table :competition_requests do |t|
       t.change_default :approved, false
    end

  end
end
