class PhotosController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:index, :show, :tagged_photos]
  before_action :set_photo, only: [:show, :edit, :update, :destroy]
  before_action :set_user, only: [:show, :edit, :new, :create,:update]

  layout "user_profile_layout", except: :view

  load_and_authorize_resource except: [:show, :create, :tagged_photos]  #bug with create

  before_filter :set_current_user


  # GET /photos
  # GET /photos.json
  def index
    @user = User.friendly.find(params[:user_id])
    @photos = @user.photos.load.paginate(:page => params[:page],per_page: 8)
    # fresh_when(@photos)
  end

  # GET /photos/1
  # GET /photos/1.json
  def show
    # @comments = @photo.comments
    fresh_when(@photo)
  end

  def tagged_photos
    @user = User.friendly.find(params[:user_id])
    @name = params[:name]
    # raise Exception
    @photos = @user.photos.tagged_with(@name, :on => :themes, :owned_by => @user).paginate(:page => params[:page],per_page: 8)
    # fresh_when(@photos)
  end

  def view
    @photo = Photo.friendly.find(params[:photo_id])
    # fresh_when(@photo)
  end

  # GET /photos/new
  def new
    @photo = Photo.new
    @user = current_user
  end

  # GET /photos/1/edit
  def edit
    @user = User.friendly.find(params[:user_id])
  end

  # POST /photos
  # POST /photos.json
  def create
  
    @photo = Photo.new(photo_params, current_user.id, true)
    authorize! :create, @photo #manualy authorize

    respond_to do |format|
    

      if @photo.save
        format.html { redirect_to user_photo_path(@user,@photo), notice: 'Photo was successfully created.' }
        format.json { render action: 'show', status: :created, location: @photo }
      else
        format.html { render action: 'new',notice: "Hmm" }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    
    end
  
  end

  # PATCH/PUT /photos/1
  # PATCH/PUT /photos/1.json
  def update
    # render text: params.inspect
    respond_to do |format|
      if @photo.update(photo_params)
        
        format.html { redirect_to user_photo_path(@user,@photo), notice: 'Photo was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /photos/1
  # DELETE /photos/1.json
  def destroy
    respond_to do |format|
      if @photo.participate_in_competition?
        format.html { redirect_to :back, notice: I18n.t(:participate_in_competition) }
      else
        @photo.destroy
        format.html { redirect_to user_photos_path(current_user), notice: I18n.t(:photo_was_deleted) }
      end
    end
  end

  private

  def set_photo
    @photo = Photo.friendly.find(params[:id])
  end

  def set_user
    @user = User.friendly.find(params[:user_id])
  end
  
  def photo_params
    params.require(:photo).permit(:title, :user_id, :image,:image_cache,:theme_tokens,:topic_id,:destination_id,:age_policy_id)
  end
end
