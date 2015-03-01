class Admin::Jury < ActiveRecord::Base

  belongs_to :user
  belongs_to :competition

  scope :vip, -> { where(vip: true) }

  attr_reader :user_tokens


  def user_tokens=(tokens)
    # self.theme_list = tokens
    # self.save
  end

  def in_jury?(user)
    Admin::Jury.where(user_id: user.id).count > 0
  end


  def rate(competition_photo, rating)
    
    jury_rating = JuryRating.find_or_create_by(user: user, competition_photo: competition_photo)
    jury_rating.update(rating: rating)
  end

end
