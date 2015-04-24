class ChangeSiteRules1 < ActiveRecord::Migration
  def change
  	remove_column :site_rules, :locale
  	add_column :site_rules, :locale, :string
  end
end
