class ChangeJuryRatingRatingType < ActiveRecord::Migration
  def change
    change_column :jury_ratings, :rating, :float
  end
end
