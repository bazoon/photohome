class CreateSiteRules < ActiveRecord::Migration
  def change
    create_table :site_rules do |t|
      t.string :locale
      t.string :rules
      t.string :rules_digest

      t.timestamps
    end
  end
end
