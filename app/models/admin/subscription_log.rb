class Admin::SubscriptionLog < ActiveRecord::Base


    def self.log(resources, user_id)
        
        resources.each do |resource|
            subscription_log = self.new
            subscription_log.resource = resource.class
            subscription_log.user_id = user_id
            subscription_log.sent = Time.zone.now
            subscription_log.resource_id = resource.id
            subscription_log.save
        end


    end

end
