class Stats

    NEW_PERIOD = 1

    attr_reader :new_users_count, :new_photo_count, :active_ticket_count
    attr_reader :active_competition_requests
    attr_reader :active_photos
    attr_reader :active_waiting_competition_requests


    def initialize
        @new_users_count = User.where("created_at >= ?", 1.day.ago).count
        @new_photo_count = Photo.where("created_at >= ?", 1.day.ago).count
        @active_ticket_count = Message.active.count



        active_competitions = Competition.active
        @active_competition_requests = 0
        @active_waiting_competition_requests = 0
        @active_photos = 0
        
        active_competitions.each do |competition|
          @active_competition_requests += competition.competition_requests.count
          @active_waiting_competition_requests += competition.competition_requests.awaiting.count
          @active_photos += competition.competition_photos.count
        end


    end



end