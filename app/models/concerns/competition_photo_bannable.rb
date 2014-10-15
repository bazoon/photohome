module CompetitionPhotoBannable
   
  extend ActiveSupport::Concern

  included do
    after_save :mark_if_status_changed
  end

#!!! remove unneded fields
  def mark_if_status_changed


    unless approved?
      competition_photos =  CompetitionPhoto.find_by_sql("select photo_id, competition_photos.competition_id, competition_photos.id, response_id
          from competition_photos,competitions,competition_requests, photos
          where (competition_photos.photo_id = photos.id) and (competition_photos.competition_id = competitions.id) and 
          (competition_requests.competition_id=competitions.id) and
          (photos.user_id = competition_requests.user_id) and (competition_requests.id=#{self.id})")
       
     
      competition_photos.each {|cp| cp.ban }
    else
      competition_photos =  CompetitionPhoto.find_by_sql("select photo_id, competition_photos.competition_id, competition_photos.id, response_id
          from competition_photos,competitions,competition_requests, photos
          where (competition_photos.photo_id = photos.id) and (competition_photos.competition_id = competitions.id) and 
          (competition_requests.competition_id=competitions.id) and
          (photos.user_id = competition_requests.user_id) and (competition_requests.id=#{self.id})")
      # raise Exception
      competition_photos.each {|cp| cp.remove_ban }

    end

  end  



end

