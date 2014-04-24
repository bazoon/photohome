class CompetitionsController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:index, :view_photos, :show]
  before_action :set_competition, only: [:show, :aply,:choose_photo,:view_photos]

  # GET /competitions
  # GET /competitions.json
  def index
    @competitions = Competition.all.order(:created_at).paginate(page: params[:page])
    fresh_when(@competitions)
  end

  # GET /competitions/1
  # GET /competitions/1.json
  def show
    fresh_when(@competition)
  end

  def aply
    @nominations = @competition.nominations
    @competition_photo = CompetitionPhoto.new
    # @photos = current_user.photos
  end

  def view_photos
    @all_jury_count = @competition.jury.count
    @competition_photos = @competition.competition_photos.where(banned: false)

    @can_like = current_user && (current_user.created_at < @competition.created_at) && (@competition.open_date > DateTime.now)
    @user = current_user
    fresh_when(@competition_photos)
  end

  def choose_photo
    @photos = current_user.photos.paginate(:page => params[:page],per_page: 8)
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
