class AlbumPhotosController < ApplicationController
  before_action :set_album_photo, only: [:show]


  def show
       
  end

private
  # Use callbacks to share common setup or constraints between actions.
  def set_album_photo
    @album_photo = AlbumPhoto.find(params[:id])
  end



end
