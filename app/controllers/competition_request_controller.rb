class CompetitionRequestController < ApplicationController
  before_action :set_competition, only: [:destroy, :create, :index]
  before_action :set_request, only: [:edit]


  def show
    @request = CompetitionRequest.find(params[:id])
  end

  def create
    if not @competition.valid_for_fiap?(current_user)
      redirect_to :back, notice: I18n.t('profile_empty')
    else
      competition_request = CompetitionRequest.user_request(@competition, current_user)

      if @competition.open? || competition_request.approved?
        redirect_to competition_photos_path(@competition)
      else
        redirect_to request_path(competition_request)
      end

    end
    

    
    

    # render text: params.inspect

  end

 

  
private
  # Use callbacks to share common setup or constraints between actions.
  def set_competition
    @competition = Competition.friendly.find(params[:competition_id])
  end

 

end
