class AddStatusToCompetition < ActiveRecord::Migration
  def change
    add_column :competitions, :status_id, :integer
    add_column :competitions, :type_id, :integer
    add_column :competitions, :open_date, :date
  end
end
