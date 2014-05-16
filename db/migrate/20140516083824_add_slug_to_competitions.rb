class AddSlugToCompetitions < ActiveRecord::Migration
  def change
    add_column :competitions, :slug, :string
  end
end
