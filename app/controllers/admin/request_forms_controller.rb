class Admin::RequestFormsController < ApplicationController
  
  def show
    @competition = Competition.friendly.find(params[:competition_id])
    
  end

end
