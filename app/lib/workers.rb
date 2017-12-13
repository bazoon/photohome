class Workers

#    require 'sidekiq/api'

    def self.remove_job(jid)
        r=Sidekiq::ScheduledSet.new
        jobs = r.select {|retri| retri.jid == jid } #all jobs
        jobs.each(&:delete)
    end


end
