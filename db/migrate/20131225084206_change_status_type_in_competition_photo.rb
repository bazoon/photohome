class ChangeStatusTypeInCompetitionPhoto < ActiveRecord::Migration
  def change
     remove_column :competition_photos, :status
     add_column :competition_photos, :banned, :boolean, :default => false
  end
end
