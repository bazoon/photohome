class Admin::BannersController <  Admin::BaseController
  before_action :set_admin_banner, only: [:show, :edit, :update, :destroy]

 # GET /admin/Admin::Banners
  # GET /admin/Admin::Banners.json
  def index
    @admin_banners = Admin::Banner.all
  end

  # GET /admin/Admin::Banners/1
  # GET /admin/Admin::Banners/1.json
  def show
  end

  # GET /admin/Admin::Banners/new
  def new
    @admin_banner = Admin::Banner.new
  end

  # GET /admin/Admin::Banners/1/edit
  def edit
  end

  # POST /admin/Admin::Banners
  # POST /admin/Admin::Banners.json
  def create
    @admin_banner = Admin::Banner.new(admin_banner_params)

    respond_to do |format|
      if @admin_banner.save
        format.html { redirect_to @admin_banner, notice: 'Admin::Banner was successfully created.' }
        format.json { render action: 'show', status: :created, location: @admin_banner }
      else
        format.html { render action: 'new' }
        format.json { render json: @admin_banner.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/Admin::Banners/1
  # PATCH/PUT /admin/Admin::Banners/1.json
  def update
    respond_to do |format|
      if @admin_banner.update(admin_banner_params)
        format.html { redirect_to @admin_banner, notice: 'Admin::Banner was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @admin_banner.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/Admin::Banners/1
  # DELETE /admin/Admin::Banners/1.json
  def destroy
    @admin_banner.destroy
    respond_to do |format|
      format.html { redirect_to admin_banners_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_banner
      @admin_banner = Admin::Banner.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_banner_params
      params.require(:admin_banner).permit(:image, :link, :title, :active)
    end


end
