class Photo < ActiveRecord::Base


  include PhotoAgePolicy
  extend FriendlyId

  friendly_id :title, use: :slugged

  PORTFOLIO_ID = 0
  REVIEW_ID = 1

  DESTINATIONS = [

    { label: I18n.t('portfolio'), value: PORTFOLIO_ID },
    { label: I18n.t('review'), value: REVIEW_ID }
    
  ]

  
  REVIEW_LIMIT = 3
  RIVIEW_PERIOD = 7

  PORTFOLIO_LIMIT = 30
  PORTFOLIO_PERIOD = 30

  LABEL = -> (s) { s[:label] }
  VALUE = -> (s) { s[:value] }


  scope :published, -> { where("published = ?", true) }
  scope :unpublished, -> { where("published = ?", false) }
  scope :seen, -> { where("seen = ?", true) }
  scope :unseen, -> { where("seen = ?", false) }
  scope :last_24, -> { where(created_at: (24.hours.ago..Time.zone.now)) }
  scope :adults, -> { joins(:age_policy).merge(Admin::AgePolicy.adults) }
  scope :deleted, -> { where("deleted = ?", true) }
  scope :not_deleted, -> { where("deleted = ?", false) }
  scope :review, -> { where("destination_id = ?", REVIEW_ID) }
  


  belongs_to :user, counter_cache: true

  belongs_to :age_policy, class_name: 'Admin::AgePolicy'

  has_many :competition_photos

  has_many :competitions, through: :competition_photos

  has_many :album_photos


  validates :user_id, presence: true
  validates :age_policy_id, presence: true
  validate :photo_size_validation

  before_save :check_limits
  self.per_page = 4

  belongs_to :topic
  
  mount_uploader :image, ImageUploader

	acts_as_taggable_on :themes
  
  acts_as_commentable

  attr_reader :theme_tokens

  def self.next(id)
    where('photos.id > ?', id).first
  end

  def self.prev(id)
    where('photos.id < ?', id).last
  end



  def initialize(params=nil, user_id=nil, published=false)
    super(params)
    self.published = published
  end

  def participate_in_competition?
    competition_photos.count > 0
  end

  def check_limits
    return false if self.user_id.nil?
    return true if self.user.has_role?(:VIP)
    check_portfolio_limit && check_review_limit
  end


  def check_portfolio_limit
    return true if self.destination_id != PORTFOLIO_ID
    on_review_count = Photo.where("destination_id=? and user_id=? and created_at >=?",PORTFOLIO_ID,self.user_id,PORTFOLIO_PERIOD.days.ago).count
    return true if on_review_count < PORTFOLIO_LIMIT
    self.errors.add(:destination_id, I18n.t(:portfolio_quote_exceeded)) 
    false
  end


  def check_review_limit
    return true if self.destination_id != 1
    on_review_count = Photo.where("destination_id=? and user_id=? and created_at >=?",REVIEW_ID,self.user_id,RIVIEW_PERIOD.days.ago).count
    return true if on_review_count < REVIEW_LIMIT
    self.errors.add(:destination_id, I18n.t(:review_quote_exceeded)) 
    # binding.pry
    false
  end


  def theme_tags
    self.themes.uniq.map(&:name)
    
  end


	def theme_tokens=(tokens)
		tokens = tokens.split(",").uniq.join(",")   
    
    # self.theme_list.remove(tokens)
    # self.theme_list = tokens
    self.user.tag(self, :with => tokens, :on => :themes)
     
    # self.save
     # raise Exception
	end


  # Удаление всех приложенных файлов
  def remove_attached_image
    image && self.remove_image!
    save
  end

  def author_name
    author || user && user.full_name
  end

  def delete_in_24_hours
    self.published = false
    self.deleted = true  
    self.sidekiq_id = DeletePhotoWorker.perform_at(1.minutes.from_now, self.id)
    self.save
  end

  def undelete
    
    if self.sidekiq_id
      Workers.remove_job(self.sidekiq_id)
      self.published = true
      self.deleted = false
      self.save
    end  
  end


  # Установление флажка о том, что фото было просмотрено модератором
  def see
    self.seen = true
    self.save!
  end


  def image_label
    image_url(:thumb)
  end

  # Все фотографии которые не участвуют в соревнованиях
  # упорядочены по дате так как find_by_sql возвращает массив и не сочетается с
  # обычным order
  def self.published_non_competition_photos
     Photo.find_by_sql(
      "select *from photos where published=true and id not in 
        (select photo_id from competition_photos,competitions where competition_photos.competition_id=competitions.id and 
         competitions.open_date > CURRENT_DATE)  order by photos.created_at desc")
  end

  def self.last_published(n)
     Photo.find_by_sql(
      "select *from photos where published=true and id not in 
        (select photo_id from competition_photos,competitions where competition_photos.competition_id=competitions.id and 
         competitions.open_date > CURRENT_DATE)  order by photos.created_at").last(n)
    
  end

  def publish
    self.published = ! self.published
    self.save!
    self.published
  end

  def self.theme_tokens(name)
    
      tags = self.tag_counts_on(:themes).where("name like ?",["%#{name}%"])
      tags = tags.map {|tag| {id: tag.name, name: tag.name} }
      
      if tags.empty?
        tags = [id: "#{name}",name: "New: #{name}"]
      end 

      tags
  end

  def age_policy_age
    (age_policy && age_policy.age) || 18
  end

  def user_name
    user.full_name if user
  end

  def self.with_scope(scope)
  
    case scope
    when 'all'
      not_deleted
    when 'unseen'
      unseen.not_deleted
    when 'last_24'
      last_24.not_deleted
    when 'unpublished'
      unpublished.not_deleted
    when 'adults'
      adults.not_deleted
    when 'deleted_photos'
      deleted
    when 'review'
      review.not_deleted
    else
      all.not_deleted
    end
  end

    private

    def photo_size_validation
      # binding.pry
      # errors.add(:image, "should be less than 0.2MB") if image.size > 200.kilobytes
      width, height = FastImage.size(image.file.file)
      errors.add(:image, I18n.t(:less_than_1000)) if width > 1000
    end

 
end
