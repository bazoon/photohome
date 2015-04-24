class RenameLetterUserToLetterPeople < ActiveRecord::Migration
  def change
  	rename_table :letter_users, :letter_people
  end
end
