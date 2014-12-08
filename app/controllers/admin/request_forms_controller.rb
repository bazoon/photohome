class Admin::RequestFormsController < ApplicationController
  
  def show
    @competition = Competition.friendly.find(params[:competition_id])
    
    @competition_requests = @competition.competition_requests.sort_by do |r|

      [r.response_compare, r.user.full_name]



    end

  end

end
