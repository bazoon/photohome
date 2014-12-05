class ChangeBodyForMailboxerNotifications < ActiveRecord::Migration
  def change
    change_column :mailboxer_notifications, :body, :text
  end
end
