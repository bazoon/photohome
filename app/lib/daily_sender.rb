class DailySender


    def send_news_to_all_subscribed

        users = UserSubscription.joins(:user).includes(:user).where(kind: UserSubscription::ON_NEWS).map(&:user) 
       
        info = EveryDayInfo.new

        users.each do |user|

           EveryDayMailer.delay(run_at: 1.minutes.from_now).send_daily_news(user, info)
           # EveryDayMailer.send_daily_news(user, info).deliver
           # Admin::SubscriptionLog.log(info.articles, user.id)
           # Admin::SubscriptionLog.log(info.novelties, user.id)

        end



    end

end