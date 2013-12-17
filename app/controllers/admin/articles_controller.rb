class Admin::ArticlesController < Admin::BaseController
  before_action :set_admin_article, only: [:show, :edit, :update, :destroy]

 load_and_authorize_resource except: [:create] 

  # GET /admin/articles
  # GET /admin/articles.json
  def index
    @admin_articles = Article.all
  end

  # GET /admin/articles/1
  # GET /admin/articles/1.json
  def show
  end

  # GET /admin/articles/new
  def new
    @admin_article = Article.new
  end

  # GET /admin/articles/1/edit
  def edit
  end

  # POST /admin/articles
  # POST /admin/articles.json
  def create
    @admin_article = Article.new(admin_article_params)
    @admin_article.user_id = current_user.id

    respond_to do |format|
      if @admin_article.save
        format.html { redirect_to [:admin, @admin_article], notice: 'Article was successfully created.' }
        format.json { render action: 'show', status: :created, location: @admin_article }
      else
        format.html { render action: 'new' }
        format.json { render json: @admin_article.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/articles/1
  # PATCH/PUT /admin/articles/1.json
  def update
    respond_to do |format|
      if @admin_article.update(admin_article_params)
        format.html { redirect_to [:admin, @admin_article], notice: 'Article was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @admin_article.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/articles/1
  # DELETE /admin/articles/1.json
  def destroy
    @admin_article.destroy
    respond_to do |format|
      format.html { redirect_to admin_articles_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_article
      @admin_article = Article.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_article_params
      params.require(:article).permit(:title, :content, :digest)
    end

  def verify_permission
    # redirect_to root_path, alert: "Admin area !" current_user && current_user.is_stuff?
    render :text => "Admin area !" unless current_user && (current_user.is_stuff? || current_user.is_writer?)
  end


end
