class RemoveJuryClosedFromCompetition < ActiveRecord::Migration
  def change
    remove_column :competitions, :jury_closed
  end
end
