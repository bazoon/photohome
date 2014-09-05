class EveryDayMailWorker


include Sidekiq::Worker

    def perform(user_id)
        info = EveryDayInfo.new
        unless info.empty?
            user = User.find(user_id)
            EveryDayMailer.send_daily_news(user, info).deliver
        end
    end

end