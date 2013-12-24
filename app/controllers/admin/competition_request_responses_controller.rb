class Admin::CompetitionRequestResponsesController < ApplicationController
  before_action :set_request, only: [:new, :destroy]
  
  def index
    @competition_requests = CompetitionRequest.where(competition_id: @competition.id).paginate(:page => params[:page], per_page: 16)
  end
  


  def new
    @request_response = Admin::CompetitionRequestResponse.where(competition_request_id: @request.id).first || 
                        Admin::CompetitionRequestResponse.new
  end

  def create
    @response = Admin::CompetitionRequestResponse.where(competition_request_id: response_params[:competition_request_id]).first ||
                Admin::CompetitionRequestResponse.create(response_params)
    @response.response_id = response_params[:response_id]            


    if @response.save!
      redirect_to admin_competition_requests_path(@response.competition)
    else
      redirect_to :back, notice: 'Error !' 
    end  
    
  end

  

  def destroy

  end


  
private

  def set_request
    @request = CompetitionRequest.find(params[:request_id])
  end

  def response_params
    params.require(:admin_competition_request_response).permit(:response_id, :competition_request_id)
  end


end
