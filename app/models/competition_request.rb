class CompetitionRequest < ActiveRecord::Base

  belongs_to :user
  belongs_to :competition

  def self.user_request(competition, user)
    self.find_or_create_by(competition_id: competition.id, user_id: user.id)
  end

  def user_name
    user && user.full_name
  end



end
