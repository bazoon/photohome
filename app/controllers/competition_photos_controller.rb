class  CompetitionPhotosController < ApplicationController
  # layout "user_profile_layout"


  def index
    
    @competition = Competition.find(params[:competition_id])
    @competition_photos = CompetitionPhoto.includes(:photo).where("photos.user_id = ?",current_user.id).references(:photos)
  end


  def update
  end

  def destroy
  end

  def create
    # render text: params.inspect
    competition = Competition.find(params[:competition_id])
    nomination_id = params[:competition_photo][:nomination_id]
    photo_ids = params[:competition_photo][:photo_ids]


    respond_to do |format|
      
      begin
        raise Exceptions::EmptyNomination if nomination_id.empty?
        raise Exceptions::NoPhotoAttached if photo_ids.empty?
        raise Exceptions::ClosedCompetition if competition.last_date < Time.now

        CompetitionPhoto.create_applied(photo_ids,competition.id,nomination_id,current_user.id)
        format.html { redirect_to competition_competition_photos_path(competition.id), notice: "Photos was successfully added" }
      rescue Exception => e
        format.html { redirect_to competition_competition_photos_path(competition.id), :flash => { :error => e.message } }              
      end

      # if error.nil? && CompetitionPhoto.create_applied(photo_ids,competition.id,nomination_id,current_user.id)
      #   format.html { redirect_to competition_competition_photos_path(competition.id), notice: "Photos was successfully added" }
      # else
      #   format.html { redirect_to competition_competition_photos_path(competition.id), :flash => { :error => error || I18n.t(:comp_photo_already_posted) } }
      # end
    
    end



  end


end
