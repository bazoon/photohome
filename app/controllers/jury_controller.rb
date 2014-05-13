class JuryController < ApplicationController


  before_filter :verify_if_jury
  before_action :set_user
  layout "user_profile_layout"
  


  def rating
    
    id = params["idBox"]
    user_id,competition_photo_id = id.split(":")
    rate = params["rate"]


    jury_rating = JuryRating.find_or_create_by(user_id: user_id, competition_photo_id: competition_photo_id)
    
    authorize! :update, jury_rating
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
    @competitions = Competition.where("open_date > ?",DateTime.now)
    @competitions = Competition.joins(:jury).where("admin_juries.user_id=? and open_date > ?",current_user.id,DateTime.now)
  end


  def view_photos
    # render text: params.inspect
    @competition = Competition.find(params[:jury][:competition_id])
    redirect_to root_path,alert: "You are not allowed to jury this competition !" unless current_user && @competition.can_jury?(current_user)
    @competition_photos = CompetitionPhoto.where(competition_id: @competition.id, banned: false).paginate(:page => params[:page])

    @user = current_user
  end


private

  def verify_if_jury
    redirect_to root_path,alert: "Jury area !" unless current_user && current_user.in_jury?
  end

  def set_user
      @user = current_user#User.find(params[:user_id])
  end

  
  

end
