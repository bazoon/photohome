class CompetitionsController < ApplicationController
  before_action :set_competition, only: [:show, :aply,:choose_photo,:view_photos]

  # GET /competitions
  # GET /competitions.json
  def index
    @competitions = Competition.all.order(:created_at).paginate(page: params[:page])
  end

  # GET /competitions/1
  # GET /competitions/1.json
  def show
  end

  def aply
    @nominations = @competition.nominations
    @competition_photo = CompetitionPhoto.new
    @photos = current_user.photos
  end

  def view_photos
    @all_jury_count = @competition.jury.count
    @competition_photos = @competition.competition_photos
    @can_like = current_user && (current_user.created_at < @competition.created_at) && (@competition.open_date > DateTime.now)
    @user = current_user
  end

  def choose_photo
   
    @photos = current_user.photos.paginate(:page => params[:page],per_page: 16)
    @first_time =  params[:page].nil? ? "1": "0"
    respond_to do |format|
      format.js
    end  
  end

  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_competition
      @competition = Competition.find(params[:id])
    end


end
