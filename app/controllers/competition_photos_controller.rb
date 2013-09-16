class  CompetitionPhotosController < ApplicationController
  # layout "user_profile_layout"


  def index
    @competition = params[:competition_id]
    @competition_photos = CompetitionPhoto.includes(:photo).where("photos.user_id = ?",current_user.id).references(:photos)
  end


  def update
  end

  def destroy
  end

  def create
    # render text: params.inspect
    competition_id = params[:competition_id]
    nomination_id = params[:competition_photo][:nomination_id]
    photo_ids = params[:competition_photo][:photo_ids]

    

    respond_to do |format|
      
      # binding.pry
      if CompetitionPhoto.create_applied(photo_ids,competition_id,nomination_id)
        format.html { redirect_to competition_competition_photos_path(competition_id), notice: 'Photos was successfully added' }
      else
        format.html { render action: 'new',notice: "Hmm" }
      end
    
    end



  end


end
