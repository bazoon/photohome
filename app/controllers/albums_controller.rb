class AlbumsController < ApplicationController
	before_action :set_album, only: [:show,:carousel]
  skip_before_filter :authenticate_user!

  def index
  	@albums = Admin::Album.all
    @last_photos = SitePhoto.last(4)
  end

  def show
    @site_photos = @album.last_photos
  end

  def carousel
    @site_photo = SitePhoto.find(params[:site_photo_id])
    @others = @album.site_photos
  end



private
  # Use callbacks to share common setup or constraints between actions.
  def set_album
    @album = Admin::Album.find(params[:id])
  end

  def album_params
    params.require(:admin_album).permit(:title)
  end
end
