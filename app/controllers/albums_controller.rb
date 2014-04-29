class AlbumsController < ApplicationController
	before_action :set_album, only: [:show]

  def index
  	@albums = Admin::Album.all
  end

  def show
    @site_photos = @album.last_photos
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
