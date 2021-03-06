class Competition < ActiveRecord::Base

  has_many :jury, class_name: "Admin::Jury", dependent: :destroy
  has_many :nominations,class_name: "Admin::Nomination", dependent: :destroy

  has_many :competition_photos, dependent: :destroy
  has_many :photos, through: :competition_photos
  
  has_many :jury_ratings, through: :competition_photos
  has_many :users, through: :jury
  has_many :competition_requests, dependent: :destroy
  
  validates :last_date, :accept_date, :open_date, :title, :type_id, :status_id, :num_stars, presence: true  
  validate Proc.new {|c| errors.add(:last_date, I18n.t(:incorrect_last_date)) if c.last_date > c.open_date}
  
  scope :active, -> { where('open_date > ?', Time.zone.now)  }


  scope :non_fotofinish, -> { where('type_id != 2') }
  scope :fotofinish, -> { where('type_id =?', 2) }

  extend FriendlyId
  friendly_id :title, use: :slugged

  enum type_id: { "usial" => 0, "fiap" => 1, 'finish' => 2 }
  enum status_id: { "open" => 0, "closed" => 1 }

  

  def loaded_in_nominations(user)
    
  end

  def jury_rating_count_for(user)
    jury_ratings.where('user_id=? and rating > 0', user.id).joins(:competition_photo).where(competition_photos: {banned: false}).count
  end

  
  def closed?
    !open?
  end

  
  def stats
    photo_count = competition_photos.not_banned.count
    jury_count = jury.count
    should_rate_count = photo_count * jury_count
    rated_count = jury_ratings.joins(:competition_photo).where('competition_photos.banned = false and jury_ratings.rating > 0').count
    jury_members = []

    users.each do |u|
      jury_members <<  { name: u.full_name, count: jury_ratings.joins(:competition_photo).where('competition_photos.banned = false and user_id = ? and rating > 0', u.id).count }
    end  

    statistics = {}
    statistics[:photo_count] = photo_count
    statistics[:jury_count] = jury_count
    statistics[:should_rate_count] = should_rate_count
    statistics[:rated_count] = rated_count
    statistics[:jury_members] = jury_members
    statistics
  end

  def jury_stats
    require "corr"
    
    corr = {}
    ratings = JuryRating.for_competition(id).order(:id).map {|e| [e.user, e.rating]}


    binding.pry
    jury.each do |j|
      
      corr[j.user.full_name] = {}

      j_ratings = ratings.select {|e| e[0] == j.user }
      next if j_ratings.length == 0

      jury.each do |i|  

        i_ratings = ratings.select {|e| e[0] == i.user }


        corr[j.user.full_name][i.user.full_name] = PearsonCorrelation.new(i_ratings.map {|e| e[1]}, j_ratings.map {|e| e[1]}).corr

      end
    end

    corr
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
    Time.zone.now > last_date
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

  def nomination_count
    nominations.count
  end


end
