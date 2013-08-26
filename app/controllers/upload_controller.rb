class UploadController < ApplicationController
protect_from_forgery with: :null_session

  def get_image

   picture = Picture.new
   picture.image = params[:image]
   picture.save
   # render :json => picture.image.url

   respond_to do |format|
     format.json { render :json => {loaded: 44,total: 100, upload: picture.image.url} }
   end

  end


end
