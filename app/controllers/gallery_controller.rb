class GalleryController < ApplicationController



  def index
    @last_photos = Photo.all.where(published: true)
  end


  def show
     @photo = Photo.find(params[:photo_id])
    
  end

end
