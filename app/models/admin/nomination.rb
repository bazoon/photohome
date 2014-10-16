class Admin::Nomination < ActiveRecord::Base
  validates :title, :max_photo_count, presence: true


def title_plus_count
  "#{title} / #{max_photo_count}"
end

end
