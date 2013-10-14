class GalleryController < ApplicationController



  def index
    # @last_photos = Photo.all.where(published: true)
    @last_photos = Photo.find_by_sql(
      "select *from photos where id not in 
       (select photo_id from competition_photos,competitions where competition_photos.competition_id=competitions.id and 
        competitions.open_date > CURRENT_DATE) and (published=true)")

    @last_photos = Photo.non_competition_photo.paginate(:page => params[:page],per_page: 16)

  end


  def show
     @photo = Photo.find(params[:photo_id])
  end

end
