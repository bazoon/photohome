class Competition < ActiveRecord::Base

  has_many  :jury,class_name: "Admin::Jury"
  has_many :nominations,class_name: "Admin::Nomination"
  has_many :competition_photos
  
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


 # past last_date ?
  def overdue?
    last_date < Time.now
  end

  def can_jury?(user)
    Competition.joins(:jury).where("admin_juries.user_id = ? and competitions.id = ?",user.id,id).count > 0
  end


end
