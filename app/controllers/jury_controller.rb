class JuryController < ApplicationController

  def rate
    puts params.inspect
    render text: params.inspect  
  end


  def choose_competition
    @competitions = Competition.where("open_date > ?",DateTime.now)
  end


  def view_photos
    @competition = Competition.find(params[:competition_id])
    @competition_photos = CompetitionPhoto.where(competition_id: @competition.id)
    @user = current_user




  end



end
