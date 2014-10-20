class CompetitionsController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:index, :view_photos, :show]
  before_action :set_competition, except: [:index]

  # GET /competitions
  # GET /competitions.json
  def index
    @competitions = Competition.all.order(:created_at).paginate(page: params[:page])
    
    # fresh_when(@competitions)
  end

  # GET /competitions/1
  # GET /competitions/1.json
  def show
    # fresh_when(@competition)
  end

  def aply
    @nominations = @competition.nominations
    @competition_photo = CompetitionPhoto.new
    # @photos = current_user.photos
  end

  def view_photos
    nomination_id = params[:nomination_id]
    @nomination = Admin::Nomination.find(nomination_id)
    # binding.pry
    @all_jury_count = @competition.jury.count
    @competition_photos = @competition.competition_photos.where(nomination_id: nomination_id).with_rating.paginate(page: params[:page], per_page: 8)
    # @can_like = current_user && (current_user.created_at < @competition.created_at) && (@competition.open_date > Time.zone.now )
    @user = current_user
    # fresh_when(@competition_photos)
  end

  def view_nominations
    
  end

  def choose_photo
    @photos = current_user.photos.paginate(:page => params[:page], per_page: 8)
    respond_to do |format|
      format.js
    end
  end

  def results_nominations
    
  end

  def results
    
    if @competition.ready_to_be_published? || can?(:jury, @competition)
      nomination_id = params[:nomination_id]
      @nomination = Admin::Nomination.find(nomination_id) 
      @competition_photos = @competition.competition_photos.where(nomination_id: nomination_id).to_a.sort_by { |cp| [cp.place==0 ? 1000: cp.place, -cp.average_rating] }
    else
      redirect_to :back, notice: 'Not published yet !'
    end

  end

  
  private


    # Use callbacks to share common setup or constraints between actions.
    def set_competition
      @competition = Competition.friendly.find(params[:id])
    end


end
