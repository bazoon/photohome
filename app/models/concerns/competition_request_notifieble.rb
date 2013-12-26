module CompetitionRequestNotifieble
  
  extend ActiveSupport::Concern

  included do
    # after_save :notify_user
    after_save :send_letter
  end


  def notify_user
    competition_title = self.competition.title
    decision = self.decision
    answer = self.answer
    UserMailer.message_email(self.user, competition_title, decision, answer).deliver
  end

  def send_letter
    uls = UserLetterSender.new(User.current, self.user)
   
    uls.send_letter("hello","nook")

  end


end