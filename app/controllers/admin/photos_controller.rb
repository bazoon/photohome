class Admin::PhotosController < Admin::BaseController

  
  def index
    @photos = Photo.all.order("published asc,updated_at desc")

  end

  def show
  end


  def publish
    @id = params[:id]

    photo = Photo.find(@id)
    photo.published = ! photo.published
    photo.save

    @published = photo.published

    respond_to do |format|

      format.js


    end  


  end


end
