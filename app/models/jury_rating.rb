class JuryRating < ActiveRecord::Base
  belongs_to :user
  belongs_to :competition_photo 

end
