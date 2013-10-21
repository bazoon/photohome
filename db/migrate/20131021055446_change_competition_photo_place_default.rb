class ChangeCompetitionPhotoPlaceDefault < ActiveRecord::Migration
  def change
    remove_column :competition_photos, :place
    remove_column :competition_photos, :integer

    add_column :competition_photos, :place, :integer, :default => 0
  end
end
