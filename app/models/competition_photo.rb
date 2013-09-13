class CompetitionPhoto < ActiveRecord::Base
  belongs_to :nomination,class_name: "Admin::Nomination"
  belongs_to :photo

  attr_accessor :photo_ids

end
