class SitePhotoController < ApplicationController
    
	before_action :set_site_photo, only: [:show, :show_with_others]



def show
  
end

def show_with_others
  @others = @site_photo.album.site_photos
  
  
end



private
  # Use callbacks to share common setup or constraints between actions.
  def set_site_photo
    @site_photo = Admin::SitePhoto.find(params[:id])
  end


end
