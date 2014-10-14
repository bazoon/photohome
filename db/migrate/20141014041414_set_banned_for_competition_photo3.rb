class SetBannedForCompetitionPhoto3 < ActiveRecord::Migration
  def change
    change_column :competition_photos, :banned, :boolean, default: true
  end
end
