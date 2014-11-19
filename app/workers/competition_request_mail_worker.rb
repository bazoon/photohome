class CompetitionRequestMailWorker
include Sidekiq::Worker


    def perform(competition_request_id)
        competition_request = CompetitionRequest.find(competition_request_id)
        
        competition_title = competition_request.competition.title
        decision = competition_request.decision
        answer = competition_request.answer
        puts competition_request.inspect
        UserMailer.message_email(competition_request.user, competition_title, decision, answer).deliver
    end

end
