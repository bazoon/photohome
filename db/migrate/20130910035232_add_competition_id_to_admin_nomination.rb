class AddCompetitionIdToAdminNomination < ActiveRecord::Migration
  def change
    add_column :admin_nominations, :competition_id, :integer
  end
end
