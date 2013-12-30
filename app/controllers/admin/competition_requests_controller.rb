class Admin::CompetitionRequestsController < ApplicationController
  before_action :set_competition, only: [:create, :index]
  before_action :set_request, only: [:edit, :update]

  def index
    @competition_requests = CompetitionRequest.where(competition_id: @competition.id).paginate(:page => params[:page], per_page: 16)
  end


  def edit


  end

  def show
    @request = CompetitionRequest.find(params[:id])
  end

  def create
    competition_request = CompetitionRequest.user_request(@competition, current_user)

    if @competition.open? || competition_request.approved 
      redirect_to competition_competition_photos_path(@competition) 
    else
      redirect_to request_path(competition_request) unless @competition.open? && competition_request.approved 
    end

    # render text: params.inspect

  end

  #Admin only !!!
  def update

    if @competition_request.update(request_params)
      competition_request_notification = CompetitionRequestNotification.new(@competition_request,current_user)
      competition_request_notification.notify
      redirect_to admin_competition_requests_path(@competition_request.competition)
    else
      redirect_to :back, notice: 'Error !' 
    end  
  end

  
private
  # Use callbacks to share common setup or constraints between actions.
  def set_competition
    @competition = Competition.find(params[:competition_id])
  end

  def set_request
    @competition_request = CompetitionRequest.find(params[:id])
  end

  def request_params
    params.require(:competition_request).permit(:response_id, :answer)
  end  

end
