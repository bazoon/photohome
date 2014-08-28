class GalleryController < ApplicationController
  respond_to :html
  
  skip_before_filter :authenticate_user!

  def index
    # @last_photos = Photo.all.where(published: true)
    # @last_photos = Photo.find_by_sql(
    #   "select *from photos where id not in 
    #    (select photo_id from competition_photos,competitions where competition_photos.competition_id=competitions.id and 
    #     competitions.open_date > CURRENT_DATE) and (published=true)")
    
    if session[:chosen_for_album]
      @chosen_photos = session[:chosen_for_album].uniq
      @photos = Photo.find(@chosen_photos)
    end


    @last_photos = Photo.published_non_competition_photos.paginate(:page => params[:page],per_page: 12)

  end


  def show
    
    @photo = Photo.find(params[:photo_id])
    @themes = @photo.theme_tags
    #Нужно подумать об изменениях комментариев при кешировании !!!
    
    # fresh_when last_modified: @photo.created_at.utc, etag: @photo
    # raise Exception
    # respond_with(@photo) if stale?(:etag => @photo, :last_modified => @photo.created_at.utc)
  end

end
