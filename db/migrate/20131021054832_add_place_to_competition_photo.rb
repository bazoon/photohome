class AddPlaceToCompetitionPhoto < ActiveRecord::Migration
  def change
    add_column :competition_photos, :place, :string
    add_column :competition_photos, :integer, :string
  end
end
