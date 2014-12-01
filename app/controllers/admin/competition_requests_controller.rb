class Admin::CompetitionRequestsController < ApplicationController
  before_action :set_competition, only: [:create, :index]
  before_action :set_request, only: [:edit, :update]
  before_action :set_filter, only: [:index]


  def index
    # binding.pry
    @competition_requests =
      if not @response_id.blank?
        @competition.competition_requests.with_response(@response_id)  
      elsif not @name.blank?
        @competition.competition_requests.with_user_last_name_like(@name)
      else
        @competition.competition_requests
      end.paginate(page: params[:page], per_page: 16)  

  end


  def edit
    

  end

  #Admin only !!!
  def update
    if @competition_request.update(request_params)
      CompetitionRequestNotification.notify(@competition_request,current_user)
      redirect_to admin_competition_requests_path(@competition_request.competition)
    else
      redirect_to :back, notice: 'Error !' 
    end  
  end

  
private
  # Use callbacks to share common setup or constraints between actions.
  def set_competition
    @competition = Competition.friendly.find(params[:competition_id])
  end

  def set_request
    @competition_request = CompetitionRequest.find(params[:id])
  end

  def request_params
    params.require(:competition_request).permit(:response_id, :answer, :permited_nomination_count)
  end  

  def set_filter
    @response_id = params[:filter][:response_id] if params[:filter]
    @name = params[:search][:name] if params[:search]
  end

end
