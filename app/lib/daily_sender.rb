class DailySender

    def send_news_to_all_subscribed
        users = UserSubscription.joins(:user).includes(:user).where(kind: UserSubscription::ON_NEWS).map(&:user) 
        users.each do |user|
           EveryDayMailWorker.perform_async(user.id)   
        end
    end
    
end