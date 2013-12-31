class NoveltiesController < ApplicationController
  skip_before_filter :authenticate_user!
  before_action :set_novelty, only: [:show, :edit, :update, :destroy]



  def list
    @novelties = Novelty.paginate(:page => params[:page])
  end

  # GET /novelties/1
  # GET /novelties/1.json
  def show
  end

private
  def set_novelty
      @novelty = Novelty.find(params[:id])
    end

end
