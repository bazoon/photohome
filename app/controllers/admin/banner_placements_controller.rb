class Admin::BannerPlacementsController < Admin::BaseController
  before_action :set_admin_banner_placement, only: [:show, :edit, :update, :destroy]

  layout "admin_layout"

  # GET /admin/banner_placements
  # GET /admin/banner_placements.json
  def index
    @admin_banner_placements = Admin::BannerPlacement.all
  end

  # GET /admin/banner_placements/1
  # GET /admin/banner_placements/1.json
  def show
  end

  # GET /admin/banner_placements/new
  def new
    @admin_banner_placement = Admin::BannerPlacement.new
  end

  # GET /admin/banner_placements/1/edit
  def edit
  end

  # POST /admin/banner_placements
  # POST /admin/banner_placements.json
  def create
    @admin_banner_placement = Admin::BannerPlacement.new(admin_banner_placement_params)

    respond_to do |format|
      if @admin_banner_placement.save
        format.html { redirect_to @admin_banner_placement, notice: 'Banner placement was successfully created.' }
        format.json { render action: 'show', status: :created, location: @admin_banner_placement }
      else
        format.html { render action: 'new' }
        format.json { render json: @admin_banner_placement.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/banner_placements/1
  # PATCH/PUT /admin/banner_placements/1.json
  def update
    respond_to do |format|
      if @admin_banner_placement.update(admin_banner_placement_params)
        format.html { redirect_to @admin_banner_placement, notice: 'Banner placement was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @admin_banner_placement.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/banner_placements/1
  # DELETE /admin/banner_placements/1.json
  def destroy
    @admin_banner_placement.destroy
    respond_to do |format|
      format.html { redirect_to admin_banner_placements_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_banner_placement
      @admin_banner_placement = Admin::BannerPlacement.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_banner_placement_params
      params.require(:admin_banner_placement).permit(:banner_id, :place_id, :start_date, :end_date, :active)
    end
end
