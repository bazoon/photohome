class JuryRating < ActiveRecord::Base
  belongs_to :user
  belongs_to :competition_photo 
  validates :user_id, uniqueness: { scope: :competition_photo_id,
        message: 'Only one rating per photo/competition' }

  scope :for_competition, -> (competition_id) { JuryRating.joins(:competition_photo)
                                                          .where(competition_photos: { competition_id: competition_id }) }

end
