class TestWorker
include Sidekiq::Worker

    def perform
        sleep 5
        puts "Working hard"
    end

end