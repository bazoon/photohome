class Admin::Nomination < ActiveRecord::Base
  validates :title, :max_photo_count, presence: true

end
