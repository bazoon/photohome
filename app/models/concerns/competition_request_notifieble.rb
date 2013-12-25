module CompetitionRequestNotifieble
  
  extend ActiveSupport::Concern

  included do
    after_save :notify_user
  end


  def notify_user

end