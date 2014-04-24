class Admin::AlbumsController < Admin::BaseController
  before_action :set_album, only: [:show, :edit, :update, :destroy]

def index
  @albums = Admin::Album.all
end

def edit
end

def new
  @album = Admin::Album.new
end

  def create
    @album = Admin::Album.new(album_params)

    respond_to do |format|
      if @album.save
        format.html { redirect_to admin_albums_path, notice: 'Album was successfully created.' }
      else
        format.html { render action: 'new' }
      end
    end
  end


def show


end

def update

    respond_to do |format|

      if @album.update(album_params)
        format.html { redirect_to admin_albums_path, notice: 'Album was successfully updated' }
      else
        format.html { render action: 'new' }
      end

    end

end  





def destroy
    
  @album.destroy
  respond_to do |format|
    format.html { redirect_to :back }
  end  

end



private
  # Use callbacks to share common setup or constraints between actions.
  def set_album
    @album = Admin::Album.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def album_params
    params.require(:admin_album).permit(:title)
  end

end
