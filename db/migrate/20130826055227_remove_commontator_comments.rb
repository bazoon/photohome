class RemoveCommontatorComments < ActiveRecord::Migration
  def change
    drop_table "commontator_comments"
  end
end
