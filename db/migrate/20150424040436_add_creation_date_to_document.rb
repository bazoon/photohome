class AddCreationDateToDocument < ActiveRecord::Migration
  def change
    add_column :documents, :creation_date, :date
  end
end
