class  Admin::CompetitionPhotosController < Admin::BaseController
  before_action :set_competition, only: [:destroy]


  def destroy
    @competition_photo.destroy
    respond_to do |format|
      format.html { redirect_to :back }
    end
  end

  def ban
    @competition_photo = CompetitionPhoto.find(params[:competition_photo_id])
    @competition_photo.update(banned: !@competition_photo.banned)
  end


  private

  def set_competition
    @competition_photo = CompetitionPhoto.find(params[:id])
  end

end
