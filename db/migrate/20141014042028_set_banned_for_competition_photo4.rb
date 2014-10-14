class SetBannedForCompetitionPhoto4 < ActiveRecord::Migration
  def change
    change_column :competition_photos, :banned, :boolean, default: false
  end
end
