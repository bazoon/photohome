class  CompetitionPhotosController < ApplicationController
  layout "user_profile_layout"


  def index
    @photos = current_user.photos.all
    @competitions = Competition.all
  end


  def update
  end

  def destroy
  end

  def create
    render text: params.inspect
  end


end
