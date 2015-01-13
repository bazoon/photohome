class CompetitionRequest < ActiveRecord::Base

  belongs_to :user
  belongs_to :competition
  validates :user_id, :competition_id, presence: true
  validates :user_id, uniqueness: { scope: :competition_id,
    message: 'Only one request per competition' }
      
  #Банит фотографии если запрос сохраняется со статусом забанен
  include CompetitionPhotoBannable
  # include CompetitionRequestNotifieble

  AWAITING = 0
  ACCEPTED = 1
  NO_MONEY = 2
  NO_CONDITION = 3
  OTHER_REASONS = 100
  BANNED = 1000

  enum response_id: { "awaiting" => 0, "accepted" => 1, "no_money" => 2, "no_condition" => 3, "other_reasons" => 100, "banned" => 1000 }
  
  scope :accepted, -> { where(response_id: ACCEPTED) }
  scope :awaiting, -> { where(response_id: AWAITING) }
  scope :unaccepted, -> { where('response_id != ?', ACCEPTED) }
  scope :with_response, -> (response_id) { send(response_id) }
  scope :with_user_last_name_like, -> (last_name) { includes(:user).joins(:user).where('last_name like ? or last_name like ? or last_name like ?', "%#{last_name}", "#{last_name}%", "%#{last_name}%")  }


  def self.user_request(competition, user)
    request = where(competition_id: competition.id, user_id: user.id).first
    return request if request
    
    request = create(competition_id: competition.id, user_id: user.id, permited_nomination_count: competition.nomination_count)
    request.update(response_id: ACCEPTED) if competition.open?
    request
  end

  def user_name
    user && user.full_name
  end

  def open?
    competition && competition.open?
  end

  def decision
    I18n.t("enums.competition_request.response_id.#{response_id}", locale: user.locale)
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

  def nomination_count
    return permited_nomination_count if competition.open? || accepted?
    0
  end

  def response_compare
    case response_id
    when AWAITING
      0
    when NO_MONEY
      8
    when ACCEPTED
      9
    else
      10
    end
  end

  def self.restricted_statuses
    statuses.except :failed, :destroyed
  end



end
