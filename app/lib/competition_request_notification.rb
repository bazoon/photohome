class CompetitionRequestNotification

  
  def self.send_mail(competition_request_id)
    # CompetitionRequestMailWorker.perform_async(competition_request_id)
    CompetitionRequestMailWorker.new.perform(competition_request_id)  
  end

  def self.send_letter(competition_request_id, user_id)

    CompetitionRequestLetterWorker.perform_async(competition_request_id, user_id)


  end

  def self.notify(competition_request, user)
    # raise Exception
    self.send_mail(competition_request.id)
    self.send_letter(competition_request.id, user.id)
  end
   
end