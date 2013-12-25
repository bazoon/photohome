class SetDefaultStatusToCompetitionPhoto < ActiveRecord::Migration
  def change
       change_table :competition_photos do |t|
        t.change_default :status, 0
    end
  end
end
