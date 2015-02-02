class Competitions::BestController < ApplicationController
  
  def index
    @competition = Competition.friendly.find(params[:competition_id])
    
    

    respond_to do |format|
      format.html do
        @competition_photos = @competition.competition_photos
                                      .not_banned
                                      .to_a.sort_by { |cp| [-cp.average_rating, cp.place == 0 ? 1000: cp.place] }
                                      .paginate(page: params[:page], per_page: 8)
        @start_num = params[:page].nil? ? 1 : (params[:page].to_i-1)*8 + 1

      end

      format.csv do  
        @competition_photos = @competition.competition_photos
                                      .not_banned
                                      .to_a.sort_by { |cp| [-cp.average_rating, cp.place == 0 ? 1000: cp.place] }
                                      
        

        csv = CSV.generate do |csv|
                csv << ["Нвзвание", "Номинация", "ФИО", "Рейтинг", "Место"]
                @competition_photos.each do |cp|
                  csv << [cp.title, cp.nomination.title, cp.photo.user.full_name, cp.average_rating, cp.place]
                end
              end
        send_data csv



      end

    end


  end


end
