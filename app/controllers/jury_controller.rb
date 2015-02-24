class JuryController < ApplicationController


  before_filter :verify_if_jury
  before_action :set_user
  layout "user_profile_layout"

  def rating
    id = params["data"]
    user_id, competition_photo_id = id.split(":")
    rate = params["rate"]

    jury_rating = JuryRating.find_or_create_by(user_id: user_id, competition_photo_id: competition_photo_id)
    
    authorize! :jury, CompetitionPhoto.find(competition_photo_id)
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
    # @competitions = Competition.where("open_date > ?", Time.zone.now)
    @competitions = Competition.joins(:jury).
                                where("admin_juries.user_id=? and open_date > ? and jury_date >= ?",
                                current_user.id, Time.zone.now.to_date, Time.zone.now.to_date)
    # finish = Competition.fotofinish.where("open_date > ? and jury_date >= ?",
    #                             Time.zone.now.to_date, Time.zone.now.to_date)

    # finish = Competition.fotofinish.joins(:competition_requests).
    #             where('competition_requests.response_id=? and competition_requests.user_id=? and open_date > ? and jury_date >= ?',
    #             1, current_user.id, Time.zone.now.to_date, Time.zone.now.to_date)  
    
  end


  def view_photos
    @competition = Competition.friendly.find(params[:competition_id])
    @scope = params[:scope]
    

    @nomination_id = params[:nominations] ? params[:nominations][:nomination_id] : params[:nomination_id]
    @nomination_id = @nomination_id.empty? ? nil : @nomination_id.try(:to_i) if @nomination_id
    


    redirect_to root_path, alert: "You are not allowed to jury this competition !" unless can? :jury, @competition

    @competition_photos =
      if @scope == 'unrated'
        CompetitionPhoto.unrated_by(current_user, @competition)
      else
        CompetitionPhoto.where(competition_id: @competition.id, banned: false)
      end


    if @nomination_id
      @competition_photos = @competition_photos.select {|cp| cp.nomination_id == @nomination_id }
    end

    @competition_photos = @competition_photos.paginate(:page => params[:page], per_page: 10)

    # binding.pry

    @should_jury = @competition.competition_photos.not_banned.count  
    

    @juried = @competition.jury_rating_count_for(current_user)
    
    # @competition_photos = CompetitionPhoto.joins(:competition_requests).includes(:photo).includes(:nomination).where(competition_requests: {response_id: 1}, banned: false, competition_id: @competition.id).distinct.order(:nomination_id).paginate(:page => params[:page])
    @user = current_user
  end

  def show
    @competition_photo = CompetitionPhoto.find(params[:photo_id])
    @scope = params[:scope]
    # binding.pry
    @nomination_id = params[:nomination_id]

    
    others = @competition_photo
              .competition.competition_photos
              .with_nomination(@competition_photo.nomination_id)
              .not_banned



    @next = others.next(@competition_photo.id)
    @prev = others.prev(@competition_photo.id)
  end


private

  def verify_if_jury
    redirect_to root_path, alert: "Jury area !" unless current_user && current_user.in_jury?
  end

  def set_user
      @user = current_user#User.find(params[:user_id])
  end

  
  

end
