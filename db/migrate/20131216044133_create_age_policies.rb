class CreateAgePolicies < ActiveRecord::Migration
  def change
    create_table :age_policies do |t|
      t.integer :age

      t.timestamps
    end
  end
end
