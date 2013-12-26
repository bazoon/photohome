class CompetitionRequest < ActiveRecord::Base

  belongs_to :user
  belongs_to :competition
  has_one :response, class_name: "Admin::CompetitionRequestResponse"
  
  #Банит фотографии если запрос сохраняется со статусом забанен
  include CompetitionPhotoBannable
  include CompetitionRequestNotifieble


  AWAITING = 0
  ACCEPTED = 1
  NO_MONEY = 2
  NO_CONDITION = 3
  OTHER_REASONS = 100
  BANNED = 1000
  

  RESPONSES = [
    {label: I18n.t("responses.awaiting"), value: AWAITING },
    {label: I18n.t("responses.accepted"), value: ACCEPTED },
    {label: I18n.t("responses.no_money"), value: NO_MONEY },
    {label: I18n.t("responses.no_condition"), value: NO_CONDITION },
    {label: I18n.t("responses.other_reasons"), value: OTHER_REASONS },
    {label: I18n.t("responses.banned"), value: BANNED }
  ]



  LABEL = -> (s) { s[:label] }
  VALUE = -> (s) { s[:value] }  


  def self.user_request(competition, user)
    self.find_or_create_by(competition_id: competition.id, user_id: user.id)
  end

  def user_name
    user && user.full_name
  end

  def open?
    competition && competition.open?
  end

  def decision
    RESPONSES.select { |r| r[:value] == self.response_id }.first[:label]
  end

  def approved?
    self.response_id == ACCEPTED
  end

  def banned?
    self.response_id == BANNED
  end

  def ban_status
    BANNED
  end


end
