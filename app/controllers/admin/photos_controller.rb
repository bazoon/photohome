class Admin::PhotosController < Admin::BaseController

  layout "moder_photo_layout"
  
  def index
    @photos = Photo.all.order("seen asc,published asc,updated_at desc").where(deleted: false)
  end

  def deleted
    @photos = Photo.all.order("seen asc,published asc,updated_at desc").where(deleted: true)
  end


  def review
    @photos = Photo.all.order("seen asc,published asc,updated_at desc").where(deleted: false,destination_id: 1)    
  end

  def show
    @photo = Photo.find(params[:id])
    @photo.see unless @photo.seen
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



  def destroy
    @id = params[:id]
    @photo = Photo.find(@id)
    @photo.delete_in_24_hours

    respond_to do |format|
      format.js
    end 
  end  


  def undelete
    @id = params[:id]
    @photo = Photo.find(@id)
    @photo.undelete

    respond_to do |format|
      format.js
    end 
    
  end





end
