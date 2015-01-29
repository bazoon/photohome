class Competitions::BestController < ApplicationController
  
  def index
    @competition = Competition.friendly.find(params[:competition_id])
    @competition_photos = @competition.competition_photos
                                      .not_banned
                                      .to_a.sort_by { |cp| [cp.place==0 ? 1000: cp.place, -cp.average_rating] }
                                      .paginate(page: params[:page], per_page: 8)
  end


end
