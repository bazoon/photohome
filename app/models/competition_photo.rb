class CompetitionPhoto < ActiveRecord::Base
  belongs_to :nomination, class_name: "Admin::Nomination"
  belongs_to :photo
  belongs_to :competition

  # delegate :user, to: :photo 

  attr_reader :photo_ids

  delegate :image_url,:title,to: :photo
  delegate :image_url,:title,to: :photo
  has_many :jury_ratings
  has_many :likes


  # before_destroy -> do 
  #   raise Exceptions::ClosedCompetition if competition.overdue? 
  #   true
  # end


  NORMAL = 0
  BANNED = 1000

  def ban
    self.banned = true
    self.save!
  end

  def remove_ban
    self.banned = false
    self.save
  end

  def self.create_applied(photo_ids,competition,nomination_id,user)
    raise Exceptions::NoPhotoAttached if photo_ids.empty?
    ids = photo_ids.split(",")
    ids.each do |id|
        raise Exceptions::DuplicatePhoto unless not_found_duplicatate?(id,competition.id)  
        self.check(competition,nomination_id,user)
        CompetitionPhoto.create!(photo_id: id,competition_id: competition.id,nomination_id: nomination_id)
      end  
  end

  def self.check(competition,nomination_id,user)
    raise Exceptions::EmptyNomination if nomination_id.empty?
    raise Exceptions::ClosedCompetition if competition.overdue?
    raise Exceptions::ProfileEmpty unless competition.valid_for_fiap?(user) 
    raise Exceptions::MaxNominationCapacity unless can_post_in_nomination?(nomination_id,user)
  end

  def like_count
    likes && likes.count
  end

  def liked_by(user)
    likes.where(user_id: user.id).count > 0
  end

  def average_rating
    jury_ratings.average(:rating).to_f.round(2)
  end
  
  def sum_rating
    jury_ratings.sum(:rating).to_i
  end

  def jury_count
    jury_ratings.try(:count)
  end

  def self.can_post_in_nomination?(nomination_id,user)
    max = Admin::Nomination.find(nomination_id).max_photo_count
    user_posted = Photo.joins(:competition_photos,:user).where("competition_photos.nomination_id=? and user_id=?",nomination_id,user.id).count  
    return false if user_posted >= max
    true  
  end


  def self.not_found_duplicatate?(id,competition_id)
    CompetitionPhoto.where(photo_id: id,competition_id: competition_id).empty?    
  end  
    

  def jury_rating(user_id)
    rating = jury_ratings.where(user_id: user_id).try(:[],0).try(:rating) || 0
  end

  
end





