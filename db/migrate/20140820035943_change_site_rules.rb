class ChangeSiteRules < ActiveRecord::Migration
  def change
  	remove_column :site_rules, :rules
  	remove_column :site_rules, :rules_digest
  	add_column :site_rules, :rules, :text
  	add_column :site_rules, :rules_digest, :text
  end
end
