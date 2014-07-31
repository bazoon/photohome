class Admin::PostsController < Admin::BaseController
  before_action :set_admin_post, only: [:show, :edit, :update, :destroy, :promote]

  before_filter :verify_permission

  load_and_authorize_resource except: [:create], :find_by => :slug # for friendly_id
  
  

  # GET /admin/articles
  # GET /admin/articles.json
  def index
    @admin_posts = post_type.all
    @post_sym = post_sym
    fresh_when(@admin_posts)
  end

  # GET /admin/articles/1
  # GET /admin/articles/1.json
  def show
  end

  # GET /admin/articles/new
  def new
    @admin_post = post_type.new
  end

  # GET /admin/articles/1/edit
  def edit

  end

  # POST /admin/articles
  # POST /admin/articles.json
  def create
    #!!! current_user.post_type.new
    @admin_post = post_type.new(admin_post_params)
    @admin_post.user_id = current_user.id

    respond_to do |format|
      if @admin_post.save
        format.html { redirect_to [:admin, posts_sym], notice: I18n.t(:new_record_added) }
        format.json { render action: 'show', status: :created, location: @admin_post }
      else
        format.html { render action: 'new' }
        format.json { render json: @admin_post.errors, status: :unprocessable_entity }
      end
    end

  end

  # PATCH/PUT /admin/articles/1
  # PATCH/PUT /admin/articles/1.json
  def update
    respond_to do |format|

      if @admin_post.update(admin_post_params)
         format.html { redirect_to [:admin, posts_sym], notice: I18n.t(:record_updated) }
        format.json { head :no_content }
        
      else
        format.html { render action: 'edit' }
        format.json { render json: @admin_post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/articles/1
  # DELETE /admin/articles/1.json
  def destroy
    @admin_post.destroy
    respond_to do |format|
      format.html { redirect_to [:admin, posts_sym] }
      format.json { head :no_content }
    end
  end

 
  private

    # Use callbacks to share common setup or constraints between actions.
    def set_admin_post
      # binding.pry

      @admin_post = post_type.friendly.find(params[:id])

    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_post_params
      params.require(post_sym).permit(:title, :content, :digest,:type, :user_id, :age_policy_id)
    end

    def post_type
      params[:type].constantize
    end

    def post_sym
      params[:type].downcase.to_sym
    end

    def posts_sym
      params[:type].downcase.pluralize.to_s
    end

  def verify_permission
    # redirect_to root_path, alert: "Admin area !" current_user && current_user.is_stuff?
    render :text => "Admin area !" unless current_user && (current_user.is_stuff? || current_user.is_writer?)
  end


end
