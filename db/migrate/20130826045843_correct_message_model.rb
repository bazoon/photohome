class CorrectMessageModel < ActiveRecord::Migration
  def change
    remove_column :messages,:message_reason_id
    remove_column :messages,:status 

    add_column :messages,:reason_id,:integer
    add_column :messages,:status_id,:integer
  end
end
