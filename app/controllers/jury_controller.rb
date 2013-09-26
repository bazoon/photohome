class JuryController < ApplicationController


  def rating
    
    id = params["idBox"]
    user_id,competition_photo_id = id.split(":")
    rate = params["rate"]


    jury_rating = JuryRating.find_or_create_by(user_id: user_id,competition_photo_id: competition_photo_id)
    jury_rating.rating = rate

        
    respond_to do |format|

      if jury_rating.save
        format.json { render json: rate, status: :ok}
      else
        format.json { render json: -1, status: 500 }
      end
        
    end 

  end


  def choose_competition
    # @competitions = Competition.where("open_date > ?",DateTime.now)
    @competitions = Competition.joins(:jury).where("admin_juries.user_id=? and open_date > ?",current_user.id,DateTime.now)

  end


  def view_photos
    @competition = Competition.find(params[:competition_id])
    @competition_photos = CompetitionPhoto.where(competition_id: @competition.id).paginate(:page => params[:page])
    @user = current_user
  end



end
