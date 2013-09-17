class Admin::NominationsController < ApplicationController
  before_action :set_competition
  before_action :set_nomination, only: [:show, :edit, :update, :destroy]


  # GET /admin/nominations
  # GET /admin/nominations.json
  def index
    @nominations = Admin::Nomination.where(competition_id: @competition.id)
  end

  # GET /admin/nominations/1
  # GET /admin/nominations/1.json
  def show

  end

  # GET /admin/nominations/new
  def new
    @nomination = Admin::Nomination.new
    # render text: params.inspect
  end

  # GET /admin/nominations/1/edit
  def edit
  end

  # POST /admin/nominations
  # POST /admin/nominations.json
  def create
    @nomination = Admin::Nomination.new(admin_nomination_params)
    @nomination.competition_id = @competition.id

    respond_to do |format|
      if @nomination.save
        format.html { redirect_to admin_competition_nominations_path(@competition), notice: 'Nomination was successfully created.' }
      else
        format.html { render action: 'new' }
      end
    end
  end

  # PATCH/PUT /admin/nominations/1
  # PATCH/PUT /admin/nominations/1.json
  def update
    # binding.pry
    respond_to do |format|
      if @nomination.update(admin_nomination_params)
        format.html { redirect_to admin_competition_nominations_path(@competition), notice: 'Nomination was successfully updated.' }
      else
        format.html { render action: 'edit' }
      end
    end
  end

  # DELETE /admin/nominations/1
  # DELETE /admin/nominations/1.json
  def destroy
    @nomination.destroy
    respond_to do |format|
      format.html { redirect_to :back }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_competition
      @competition = Competition.find(params[:competition_id])
    end

    def set_nomination
      @nomination = Admin::Nomination.find(params[:id])
    end


    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_nomination_params
      params.require(:admin_nomination).permit(:title, :description,:max_photo_count)
    end
end
