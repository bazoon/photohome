class CompetitionRequestLetterWorker
include Sidekiq::Worker

     def perform(competition_request_id, user_id)
        competition_request = CompetitionRequest.find(competition_request_id)
        user = User.find(user_id)
        uls = UserLetterSender.new(user, competition_request.user)
        competition_title = competition_request.competition.title
        decision = competition_request.decision
        answer = competition_request.answer
        uls.send_letter(competition_title,"#{I18n.t('status_changed', locale: user.locale)}: #{decision}. #{answer} ")
    end


end