class Competition < ActiveRecord::Base

  has_many :jury, class_name: "Admin::Jury", dependent: :destroy
  has_many :nominations,class_name: "Admin::Nomination", dependent: :destroy

  has_many :competition_photos, dependent: :destroy
  has_many :photos, through: :competition_photos
  
  has_many :jury_ratings, through: :competition_photos
  has_many :users, through: :jury
  has_many :competition_requests, dependent: :destroy
  
  
  validate Proc.new {|c| errors.add(:last_date, I18n.t(:incorrect_last_date)) if c.last_date > c.open_date}
  validates :last_date, :accept_date, :open_date, :title, :type_id, :status_id, :num_stars, presence: true

  extend FriendlyId
  friendly_id :title, use: :slugged


  USIAL= 0
  FIAP = 1

  TYPES = [
    { label: I18n.t("usial"), value: USIAL },
    { label: I18n.t("fiap"), value: FIAP }
  ]

  OPEN = 0
  PRIVATE = 1

  STATUSES = [
    {label: I18n.t("open"),value: OPEN },
    {label: I18n.t("private"),value: PRIVATE }
  ]

  LABEL = -> (s){s[:label]}
  VALUE = -> (s){s[:value]}  

  def open?
    self.status_id == OPEN
  end

  def closed?
    self.status_id != OPEN
  end

  def fiap?
    self.type_id == FIAP
  end

  def stats
    photo_count = competition_photos.count
    jury_count = jury.count
    should_rate_count = photo_count * jury_count
    rated_count = jury_ratings.count
    jury_members = []
    users.each do |u|
      jury_members <<  { name: u.name,count: jury_ratings.where(user_id: u.id).count }
    end  

    statistics = {}
    statistics[:photo_count] = photo_count
    statistics[:jury_count] = jury_count
    statistics[:should_rate_count] = should_rate_count
    statistics[:rated_count] = rated_count
    statistics[:jury_members] = jury_members
    statistics
  end

  def has_approved_request_for?(user)
    @request_ ||= competition_requests.accepted.where(user: user).first
  end

  def participate?(user)
    photos.where(user_id: user).count > 0
  end

  def has_unaccepted_request?(user)
    competition_requests.unaccepted.where(user: user).first
  end

  def has_awaiting_request?(user)
    competition_requests.awaiting.where(user: user).first
  end


  def can_upload_photo?(user)
    open? || has_approved_request_for?(user)
  end



 # past last_date ?

  def accepts_requests?
    accept_date && accept_date < Time.zone.now
  end

  def overdue?
    last_date < Time.zone.now
  end

  def ready_to_be_published?
    open_date <= Time.zone.now
  end

  def can_jury?(user)
    Competition.joins(:jury).where("admin_juries.user_id = ? and competitions.id = ?",user.id,id).count > 0
  end

  def valid_for_fiap?(user)
    not (fiap? && user.profile_empty?)
  end


end
