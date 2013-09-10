class CreateCompetitions < ActiveRecord::Migration
  def change
    create_table :competitions do |t|
      t.string :title
      t.text :description
      t.date :last_date

      t.timestamps
    end
  end
end
