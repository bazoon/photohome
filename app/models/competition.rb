class Competition < ActiveRecord::Base

  has_many  :jury,class_name: "Admin::Jury"
  has_many :nominations,class_name: "Admin::Nomination"
  has_many :competition_photos
  has_many :jury_ratings, through: :competition_photos
  has_many :users, through: :jury

  USIAL= 0
  FIAP = 1

  TYPES = [
    {label: I18n.t("usial"),value: USIAL},
    {label: I18n.t("fiap"),value: FIAP}
  ]

  OPEN = 0
  PRIVATE = 1

  STATUSES = [
    {label: I18n.t("open"),value: OPEN},
    {label: I18n.t("private"),value: PRIVATE}
  ]


  LABEL = -> (s){s[:label]}
  VALUE = -> (s){s[:value]}  


  def stats
    
    photo_count = competition_photos.count
    jury_count = jury.count
    should_rate_count = photo_count * jury_count
    rated_count = jury_ratings.count

    

    jury_members = []

    users.each do |u|

      jury_members <<  {name: u.name,count: jury_ratings.where(user_id: u.id).count}  
    
    end  

    statistics = {}
    statistics[:photo_count] = photo_count
    statistics[:jury_count] = jury_count
    statistics[:should_rate_count] = should_rate_count
    statistics[:rated_count] = rated_count
    statistics[:jury_members] = jury_members
    statistics
  end


 # past last_date ?
  def overdue?
    last_date < Time.now
  end

  def can_jury?(user)
    Competition.joins(:jury).where("admin_juries.user_id = ? and competitions.id = ?",user.id,id).count > 0
  end


end
