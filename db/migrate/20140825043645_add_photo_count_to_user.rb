class AddPhotoCountToUser < ActiveRecord::Migration
  def change
    add_column :users, :photos_count, :integer

    User.all.each do |u|
      User.reset_counters(u.id,:photos)
    end

  end
end
