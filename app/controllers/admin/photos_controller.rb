  class Admin::PhotosController < Admin::BaseController

  layout "moder_photo_layout"
  
  def index
    # @photos = Photo.all.order("seen asc,published asc,updated_at desc").where(deleted: false)
    @scope = params[:scope]

    @title = @scope ? I18n.t(@scope) : I18n.t(:all)

    @photos = Photo.with_scope(@scope)    
    @photos = @photos.order("seen asc, created_at desc").paginate(page: params[:page], per_page: 16)
  end

  def deleted
    @photos = Photo.all.order("seen asc,published asc,updated_at desc").where(deleted: true)
  end

  def review
    @photos = Photo.all.order("seen asc,published asc,updated_at desc").where(deleted: false,destination_id: 1)    
  end

  def show
    @photo = Photo.find(params[:id])
    @scope = params[:scope]
    photos = Photo.with_scope(@scope)
    @next_photo_id = photos.next(@photo.id)
    @prior_photo_id = photos.prev(@photo.id)
    @photo.see unless @photo.seen
  end

  def edit
      @photo = Photo.find(params[:id])
  end

  def publish
    
    photo = Photo.find(params[:id])
    @published  = photo.publish
    @id = photo.id


    respond_to do |format|
      format.js
    end 
     
  end

  def destroy
    @photo = Photo.find(params[:id])
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

  def update
     @photo = Photo.find(params[:id])
    respond_to do |format|
      if @photo.update(photo_params)
        format.html { redirect_to admin_photos_path, notice: 'Photo was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

private


   def photo_params
      params.require(:photo).permit(:title, :user_id, :image,:image_cache,:theme_tokens,:topic_id,:destination_id,:age_policy_id)
    end


end
