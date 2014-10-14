class  CompetitionPhotosController < ApplicationController
  # layout "user_profile_layout"

   # skip_before_action :verify_login, only: []
   before_action :set_competition, only: [:destroy]


  # Показывает фотографии отправленные пользователем на конкурс. Только его фото.
  # и только определенный конкурс
  def index
    @competition = Competition.friendly.find(params[:competition_id])
    @apply_info = CompetitionPhotoApply.new(@competition, current_user)
    
  end

  

  def destroy
    
    respond_to do |format|
      
      begin  
        @competition_photo.destroy
        format.html { redirect_to :back }
      rescue Exception => e 
        format.html { redirect_to :back, :flash => { :error => e.message } }
      end  

    end

  end

  def create
    competition = Competition.friendly.find(params[:competition_id])
    nomination_id = params[:competition_photo][:nomination_id]
    photo_ids = params[:competition_photo][:photo_ids]

    photo_apply = CompetitionPhotoApply.new(competition, current_user)

    respond_to do |format|
      
      begin
        photo_apply.create(photo_ids, nomination_id)
        format.html { redirect_to competition_photos_path(competition.id), notice: I18n.t(:photos_saved) }
      rescue Exception => e
        format.html { redirect_to competition_photos_path(competition.id), :flash => { :error => e.message } }              
      end

    
    end



  end


private

def set_competition
  @competition_photo = CompetitionPhoto.find(params[:id])
end


end
