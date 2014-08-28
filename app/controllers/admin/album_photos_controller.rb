class Admin::AlbumPhotosController < ApplicationController
  before_action :set_album_photo, only: [:edit, :update, :destroy]

  def new
    @photo = Photo.new
    @album_photo = AlbumPhoto.new
    @album = Admin::Album.find(params[:album_id])


  end

  def edit
    @photo = Photo.find(@album_photo.photo_id)

  end

  def create
    @album_photo = AlbumPhoto.new(album_photo_params.except(:photo))
    @album = Admin::Album.find(@album_photo.album_id)
    @photo = Photo.new(album_photo_params[:photo])
    @photo.user_id = current_user.id
    @photo.save
    @album_photo.photo_id = @photo.id
    
    
    
    respond_to do |format|
      if @album_photo.save

        format.html { redirect_to admin_album_path(@album_photo.album), notice: 'album_photo was successfully added.' }
      else
        format.html { render action: 'new' }
      end
  end
  


  end

  def update
      
     @album_photo.update(album_photo_params.except(:photo))
     photo = @album_photo.photo.update(album_photo_params[:photo])
 
    respond_to do |format|
      if @album_photo.save 
        format.html { redirect_to admin_album_path(@album_photo.album), notice: 'album_photo was successfully added.' }
      else
        format.html { render action: 'new' }
     end
    end 

  end

  def destroy
    @album_photo.destroy
  
     respond_to do |format|
      format.html { redirect_to :back }
    end  
  end



private
  # Use callbacks to share common setup or constraints between actions.
  def set_album_photo
    @album_photo = AlbumPhoto.find(params[:id])
    @album = Admin::Album.find(params[:album_id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def album_photo_params
    params.require(:album_photo).permit(:album_id, photo: [:title, :image, :age_policy_id, :author])
  end


end
