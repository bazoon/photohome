class DefaultStatusIdForMessage < ActiveRecord::Migration
  def change
    change_table :messages do |t|
       t.change_default :status_id, 0
    end
  end
end
