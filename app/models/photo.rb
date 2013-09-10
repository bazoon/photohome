class Photo < ActiveRecord::Base
	# belongs_to :gallery
  belongs_to :user

  validates :user_id, presence: true

  before_save :check_limits

  PORTFOLIO_ID = 0
  REVIEW_ID = 1

  DESTINATIONS = [

    {label: I18n.t("portfolio"),value: PORTFOLIO_ID},
    {label: I18n.t("review"),value: REVIEW_ID}
    
  ]

  
  REVIEW_LIMIT = 3
  RIVIEW_PERIOD = 7

  PORTFOLIO_LIMIT = 30
  PORTFOLIO_PERIOD = 30



  LABEL = -> (s){s[:label]}
  VALUE = -> (s){s[:value]}  

  belongs_to :topic
  mount_uploader :image, ImageUploader

	acts_as_taggable_on :themes
  
  acts_as_commentable

	# attr_accessible :theme_tokens
	attr_reader :theme_tokens

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


	def theme_tokens=(tokens)
		self.theme_list = tokens
		self.save
	end


  # Удаление всех приложенных файлов
  def remove_attached_image
    image && self.remove_image!
    save
  end

  handle_asynchronously :remove_attached_image, :run_at => Proc.new { 24.hours.from_now }

  def delete_in_24_hours
    self.published = false
    self.deleted = true  
    self.delayed_job_id=self.remove_attached_image.id
    self.save
  end

  def undelete
    if self.delayed_job_id
      Delayed::Job.find(self.delayed_job_id).destroy 
      self.published = true
      self.deleted = false
      self.save
    end  
  end


  # Установление флажка о том, что фото было просмотрено модератором
  def see
    self.seen = true
    self.save
  end



end
