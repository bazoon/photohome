class Admin::SitePhotoController < Admin::BaseController
  
  before_action :set_site_photo, only: [:show, :edit, :update, :destroy]

def index
  @site_photos = SitePhoto.paginate(:page => params[:page],per_page: 16)
end

def edit
end

def new
  @site_photo = SitePhoto.new
  @album = Admin::Album.find(params[:album_id])
  # render text: params.inspect
end

def choose
   @site_photo = SitePhoto.new
   @photo_id = params[:photo_id]
   @photo = Photo.find(@photo_id)
end  

def show
  
end

def create
  # render :text => site_photo_params
  @site_photo = SitePhoto.new(site_photo_params)

  # raise Exception  

  respond_to do |format|
    if @site_photo.save
      format.html { redirect_to admin_album_path(@site_photo.album), notice: 'site_photo was successfully added.' }
    else
      format.html { render action: 'new' }
    end
  end

end


def update

    respond_to do |format|

      if @site_photo.update(site_photo_params)
        format.html { redirect_to admin_site_photos_path, notice: 'site_photo was successfully updated' }
      else
        format.html { render action: 'new' }
        format.json { render json: @topic.errors, status: :unprocessable_entity }
      end

    end

end  





def destroy
    
  @site_photo.destroy
  respond_to do |format|
    format.html { redirect_to :back }
    format.json { head :no_content }
  end  

end



private
  # Use callbacks to share common setup or constraints between actions.
  def set_site_photo
    @site_photo = SitePhoto.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def site_photo_params
    params.require(:site_photo).permit(:title, :photo_id, :image,:image_cache, :album_id,:album,:age_policy_id)
  end

end
