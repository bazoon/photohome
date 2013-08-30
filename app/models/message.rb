class Message < ActiveRecord::Base
  belongs_to :user
  acts_as_commentable


  STATUSES = [{label: I18n.t("opened"),value: 0},{label: I18n.t("in_process"),value: 1},{label: I18n.t("closed"),value: 2}]

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
