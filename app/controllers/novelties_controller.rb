class NoveltiesController < ApplicationController
  skip_before_filter :authenticate_user!
  before_action :set_novelty, only: [:show, :edit, :update, :destroy]



  def list
    @novelties = Novelty.paginate(:page => params[:page])
    fresh_when(@novelties)
  end

  # GET /novelties/1
  # GET /novelties/1.json
  def show
    fresh_when(@novelty)
  end

private
  def set_novelty
      @novelty = Novelty.friendly.find(params[:id])
    end

end
