module CompetitionRequestNotifieble
  
  extend ActiveSupport::Concern

  included do
    after_save :notify_user
  end




end