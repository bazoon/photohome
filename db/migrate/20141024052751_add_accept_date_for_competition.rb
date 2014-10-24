class AddAcceptDateForCompetition < ActiveRecord::Migration
  def change
    add_column :competitions, :accept_date, :date
  end
end
