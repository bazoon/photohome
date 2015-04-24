class AddJuryClosedToCompetition < ActiveRecord::Migration
  def change
    add_column :competitions, :jury_closed, :boolean
  end
end
