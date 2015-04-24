class AddNumStarsToCompetition < ActiveRecord::Migration
  def change
    add_column :competitions, :num_stars, :integer
  end
end
