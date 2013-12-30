class CompetitionRequestNotification

  def initialize(competition_request,user)
    @competition_request = competition_request
    @user = user
  end


  def send_mail
    competition_title = @competition_request.competition.title
    decision = @competition_request.decision
    answer = @competition_request.answer
    UserMailer.message_email(@competition_request.user, competition_title, decision, answer).deliver
  end


  def send_letter
    uls = UserLetterSender.new(@user, @competition_request.user)
    competition_title = @competition_request.competition.title
    decision = @competition_request.decision
    answer = @competition_request.answer
    uls.send_letter(competition_title,"#{I18n.t('status_changed')}: #{decision}. #{answer} ")
  end

  def notify
    send_mail
    send_letter  
  end
   
end