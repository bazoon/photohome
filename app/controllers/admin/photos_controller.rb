  class Admin::PhotosController < Admin::BaseController

  layout "moder_photo_layout"
  
  def index
    # @photos = Photo.all.order("seen asc,published asc,updated_at desc").where(deleted: false)
    @scope = params[:scope]

    @photos = case @scope
      when "all"
        @title = I18n.t(:all)
        Photo.all.not_deleted
      when "unseen"
        @title = I18n.t(:unseen)
        Photo.unseen.not_deleted  
      when "last_24"
        @title = I18n.t(:last_24)
        Photo.last_24.not_deleted
      when "unpublished"
        @title = I18n.t(:unpublished)
        Photo.unpublished.not_deleted
      when "adults"
        @title = I18n.t(:for_adults)
        Photo.adults.not_deleted
      when "deleted"
        @title = I18n.t(:deleted_photos)
        Photo.deleted
      when "review"
        @title = I18n.t(:for_review)
        Photo.review.not_deleted
      else
        @title = I18n.t(:all)
        Photo.all.not_deleted
    end.order("seen asc, created_at desc").paginate(page: params[:page], per_page: 16)


  end

  def deleted
    @photos = Photo.all.order("seen asc,published asc,updated_at desc").where(deleted: true)
  end

  def review
    @photos = Photo.all.order("seen asc,published asc,updated_at desc").where(deleted: false,destination_id: 1)    
  end

  def show
    @photo = Photo.find(params[:id])
    @photo_ids = params[:photo_ids]
    
    photos = @photo_ids.split(",").map(&:to_i)
    
    index = photos.index(@photo.id)
    @prior_photo_id = photos[index - 1] if index > 0
    @next_photo_id = photos[index + 1] if index < photos.count - 1

    @photo.see unless @photo.seen
  end

  def edit
      @photo = Photo.find(params[:id])
  end

  def publish
    @id = params[:id]
    @published = Photo.find(@id).publish

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
