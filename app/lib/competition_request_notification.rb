class CompetitionRequestNotification

  
  def self.send_mail(competition_request, user)
    competition_title = competition_request.competition.title
    decision = competition_request.decision
    answer = competition_request.answer
    UserMailer.message_email(competition_request.user, competition_title, decision, answer).deliver
  end

  def self.send_letter(competition_request, user)
    uls = UserLetterSender.new(user, competition_request.user)
    competition_title = competition_request.competition.title
    decision = competition_request.decision
    answer = competition_request.answer
    uls.send_letter(competition_title,"#{I18n.t('status_changed')}: #{decision}. #{answer} ")
  end

  def self.notify(competition_request, user)
    send_mail(competition_request, user)
    send_letter(competition_request, user)
  end
   
end