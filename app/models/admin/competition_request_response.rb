class Admin::CompetitionRequestResponse < ActiveRecord::Base

  belongs_to :competition_request
  has_one :competition, through: :competition_request
  has_one :user, through: :competition_request

  include CompetitionPhotoBannable

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

  def decision
    RESPONSES.select { |r| r[:value] == self.response_id }.first[:label]
  end

  def approved?
    self.response_id == ACCEPT
  end

  def banned?
    self.response_id == BANNED
  end

  def ban_status
    BANNED
  end
  

  # def mark_if_banned

  #   if banned?
  #     competition_photos =  CompetitionPhoto.find_by_sql("select photo_id, competition_photos.competition_id, competition_photos.id, response_id 
  #         from competition_photos,competitions,competition_requests,admin_competition_request_responses
  #         where (competition_photos.competition_id = competitions.id) and 
  #         (competition_requests.competition_id=competitions.id) and 
  #         (admin_competition_request_responses.competition_request_id = competition_requests.id) and 
  #         (admin_competition_request_responses.response_id != #{BANNED})")
  #     competition_photos.each {|cp| cp.ban }
  #   end

  # end  

end
