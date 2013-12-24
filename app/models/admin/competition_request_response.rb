class Admin::CompetitionRequestResponse < ActiveRecord::Base

  belongs_to :competition_request
  has_one :competition, through: :competition_request

  ACCEPT = 0
  NO_MONEY = 1
  NO_CONDITION = 2
  OTHER_REASONS = 100

  RESPONSES = [
    {label: I18n.t("responses.accept"), value: ACCEPT },
    {label: I18n.t("responses.no_money"), value: NO_MONEY },
    {label: I18n.t("responses.no_condition"), value: NO_CONDITION },
    {label: I18n.t("responses.other_reasons"), value: OTHER_REASONS }
  ]


  LABEL = -> (s) { s[:label] }
  VALUE = -> (s) { s[:value] }  

  def decision
    RESPONSES.select { |r| r[:value] == self.response_id }.first[:label]
  end

  def approved?
    self.response_id == ACCEPT
  end

end
