class CompetitionPhotoApply
  
  attr_reader :competition, :user

  def initialize(competition, user)
    @competition = competition
    @user = user
  end
  

  def photos
    @_photos ||= CompetitionPhoto.includes(:photo).where("photos.user_id = ? and competition_photos.competition_id = ?",
                                            @user.id,@competition.id).references(:photos)
  end


  def by_nomination
    @by_nomination ||= @_photos.group_by { |p| p.nomination.title }
  end
 

  def create(photo_ids,nomination_id)

    raise Exceptions::NoPhotoAttached if photo_ids.empty?
    check(nomination_id)

    ids = photo_ids.split(",")

    raise Exceptions::DuplicatePhoto if found_duplicatate?(ids)  

    ActiveRecord::Base.transaction do
      ids.each do |id|
        CompetitionPhoto.create!(photo_id: id,competition_id: competition.id,nomination_id: nomination_id)
      end  
    end

  end

  def check(nomination_id)
    raise Exceptions::EmptyNomination if nomination_id.empty?
    raise Exceptions::ClosedCompetition if @competition.overdue?
    raise Exceptions::ProfileEmpty unless @competition.valid_for_fiap?(@user) 
    raise Exceptions::MaxNominationCapacity unless can_post_in_nomination?(nomination_id,@user)
  end


  def found_duplicatate?(photo_ids)
    competition_photo_ids = CompetitionPhoto.where(competition_id: @competition.id).pluck(:photo_id)
    not (competition_photo_ids & photo_ids.map(&:to_i)).empty?
    # raise Exception
  end  


   def can_post_in_nomination?(nomination_id,user)
    max = Admin::Nomination.find(nomination_id).max_photo_count
    user_posted = Photo.joins(:competition_photos,:user).where("competition_photos.nomination_id=? and user_id=?",nomination_id,user.id).count  
    return false if user_posted >= max
    true  
  end




end