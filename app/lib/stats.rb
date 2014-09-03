class Stats

    NEW_PERIOD = 1

    attr_reader :new_users_count, :new_photo_count, :active_ticket_count


    def initialize
        @new_users_count = User.where("created_at >= ?", 1.day.ago).count
        @new_photo_count = Photo.where("created_at >= ?", 1.day.ago).count
        @active_ticket_count = Message.active.count
    end



end