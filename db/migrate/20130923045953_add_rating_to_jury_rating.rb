class AddRatingToJuryRating < ActiveRecord::Migration
  def change
    add_column :jury_ratings, :rating, :integer
  end
end
