class Admin::CompetitionsController < Admin::BaseController
  before_action :set_competition, only: [:show, :edit, :update, :destroy,:view_posted,:final_judge,:stats]

  # GET /competitions
  # GET /competitions.json
  def index
    @competitions = Competition.all
  end

  # GET /competitions/1
  # GET /competitions/1.json
  
  def view_posted
    @all_jury_count = @competition.jury.count
    @competition_photos = @competition.competition_photos.sort_by {|cp|  -cp.average_rating}
  end

  def stats
    @stats = @competition.stats
  end

  def final_rating
    competition_photo_id = params["idBox"]
    rating = params["rate"].to_i
    jury_ratings = JuryRating.where(competition_photo_id: competition_photo_id)
   
    jury_ratings.each do |jr|
      jr.rating = rating
      jr.save
    end  

    respond_to do |format|
      format.json { render json: rating, status: :ok}
    end 

  end

  # GET /competitions/new
  def new
    @competition = Competition.new
  end

  # GET /competitions/1/edit
  def edit
  end

  # POST /competitions
  # POST /competitions.json
  def create
    @competition = Competition.new(competition_params)

    respond_to do |format|
      if @competition.save
        format.html { redirect_to admin_competitions_path, notice: 'Competition was successfully created.' }
        format.json { render action: 'show', status: :created, location: @competition }
      else
        format.html { render action: 'new' }
        format.json { render json: @competition.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /competitions/1
  # PATCH/PUT /competitions/1.json
  def update
    respond_to do |format|
      if @competition.update(competition_params)
        format.html { redirect_to admin_competitions_path, notice: 'Competition was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @competition.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /competitions/1
  # DELETE /competitions/1.json
  def destroy
    @competition.destroy
    respond_to do |format|
      format.html { redirect_to admin_competitions_path }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_competition
      @competition = Competition.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def competition_params
      params.require(:competition).permit(:title, :description, :last_date,:open_date,:status_id,:type_id)
    end

end
