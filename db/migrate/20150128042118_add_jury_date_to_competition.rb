class AddJuryDateToCompetition < ActiveRecord::Migration
  def change
    add_column :competitions, :jury_date, :date
  end
end
