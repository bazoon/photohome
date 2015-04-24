class AlbumsController < ApplicationController
	before_action :set_album, only: [:show,:carousel]
  skip_before_filter :authenticate_user!

  def index
  	@albums = Admin::Album.all.order('created_at desc')
    # @last_photos = Photo.last(4)
  end


  def show
    
  end

  def carousel
    @album_photo = AlbumPhoto.find(params[:album_photo_id])
    @others = @album.album_photos
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
