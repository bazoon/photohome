class Admin::FillAlbumFromTagsController < ApplicationController
   before_action :set_album, only: [:new, :create]

  def new

  end

  def create
    
    theme_tokens = params[:photo_theme_tokens]
    if Admin::Album.import_from_tags(theme_tokens, @album.id)
        redirect_to admin_album_path(@album.id), notice: 'Album was successfully created.' 
    else
        redirect_to new_admin_album_fill_album_from_tag_path(@album.id), notice('error')

    end
  end


private
  # Use callbacks to share common setup or constraints between actions.
  def set_album
    @album = Admin::Album.find(params[:album_id])
  end



end
