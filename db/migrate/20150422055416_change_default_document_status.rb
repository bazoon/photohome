class ChangeDefaultDocumentStatus < ActiveRecord::Migration
  def change
    change_column :documents, :status, :integer, :default => 0
  end
end
