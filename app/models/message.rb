class Message < ActiveRecord::Base
  belongs_to :user
  acts_as_commentable

  delegate :full_name, to: :user

  OPEN = 0
  IN_PROGRESS = 1
  CLOSED = 2  

  STATUSES = [{label: I18n.t("opened"),value: OPEN},{label: I18n.t("in_process"),value: IN_PROGRESS},{label: I18n.t("closed"),value: CLOSED}]

  scope :active, -> { where("status_id != ?", CLOSED) }

  REASONS = [

    {label: I18n.t("complaint"),value: 0},
    {label: I18n.t("proposal"),value: 1},
    {label: I18n.t("contest"),value: 2}

  ]

  LABEL = -> (s){s[:label]}
  VALUE = -> (s){s[:value]}  


  def status_text
    STATUSES[status_id][:label]
  end

  def reason_text
    REASONS[reason_id][:label]
  end

end
