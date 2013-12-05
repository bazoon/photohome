class  CompetitionPhotosController < ApplicationController
  # layout "user_profile_layout"
   before_action :set_competition, only: [:destroy]

  # Показывает фотографии отправленные пользователем на конкурс. Только его фото.
  # и только определенный конкурс
  def index
    @competition = Competition.find(params[:competition_id])
    @competition_photos = CompetitionPhoto.includes(:photo).where("photos.user_id = ? and competition_photos.competition_id = ?",
                                                           current_user.id,@competition.id).references(:photos)
  end

  def destroy
    
    @competition = Competition.find(params[:competition_id])

    respond_to do |format|
      
      begin  
        raise Exceptions::ClosedCompetition if @competition.overdue?
        @competition_photo.destroy 
        format.html { redirect_to :back }
      rescue Exception => e 
        format.html { redirect_to :back, :flash => { :error => e.message } }
      end  

    end

  end

  def create
    # render text: params.inspect
    competition = Competition.find(params[:competition_id])
    nomination_id = params[:competition_photo][:nomination_id]
    photo_ids = params[:competition_photo][:photo_ids]

    respond_to do |format|
      
      begin
        CompetitionPhoto.create_applied(photo_ids,competition,nomination_id,current_user)
        format.html { redirect_to competition_competition_photos_path(competition.id), notice: "Photos was successfully added" }
      rescue Exception => e
        format.html { redirect_to competition_competition_photos_path(competition.id), :flash => { :error => e.message } }              
      end

    
    end



  end


private

def set_competition
  @competition_photo = CompetitionPhoto.find(params[:id])
end


end
