class CompetitionRequest < ActiveRecord::Base

  belongs_to :user
  belongs_to :competition
  has_one :response, class_name: "Admin::CompetitionRequestResponse"

 
  def self.user_request(competition, user)
    self.find_or_create_by(competition_id: competition.id, user_id: user.id)
  end

  def user_name
    user && user.full_name
  end

  def approve!
    self.approved = (not self.approved)
    self.save!
  end

  def decision
    (response && response.decision) || I18n.t("")
  end

  def approved?
    (response && response.approved?) || false
  end

end
