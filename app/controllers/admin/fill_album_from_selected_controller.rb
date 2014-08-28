class Admin::FillAlbumFromSelectedController < ApplicationController

  def create
    photo_ids = session[:chosen_for_album].uniq
    album_id = params[:album_id]

    if Admin::Album.import_from_selected(photo_ids, album_id)
        session[:chosen_for_album] = nil
        redirect_to admin_album_path(album_id), notice: 'Album was successfully created.' 
    else
        redirect_to admin_album_path(album_id), notice('error')
    end


  end


end
