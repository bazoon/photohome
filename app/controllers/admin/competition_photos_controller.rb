class  Admin::CompetitionPhotosController < Admin::BaseController
  before_action :set_competition, only: [:destroy]


  def destroy
    @competition_photo.destroy
    respond_to do |format|
      format.html { redirect_to :back }
      format.json { head :no_content }
    end
  end


private

def set_competition
  @competition_photo = CompetitionPhoto.find(params[:id])
end

end
