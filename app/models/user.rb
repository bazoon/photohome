class User < ActiveRecord::Base
  rolify
  # resourcify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable

  @@current_user = nil



  extend FriendlyId
  friendly_id :login, use: :slugged

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  mount_uploader :avatar, AvatarUploader

  validates :name, :email, presence: true
  validates :birth_date, presence: { message: I18n.t("incorrect_birth_date") }
  validate :birth_date_valid?
  validates :terms_of_service, acceptance: true, on: :create, allow_nil: false
  
  # after_save :set_friendly_id

  # validates :last_name, :adress, :zip_code, :city, :country, presence: true
  
  has_many :photos, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :jury,class_name: "Admin::Jury"
  has_many :letters, dependent: :destroy
  has_many :competition_requests, dependent: :destroy

  has_many :user_subscriptions
  
  acts_as_tagger

  #change id to other attr !!!

  # def to_param 
  #   name
  # end

  # 

  def should_generate_new_friendly_id?
    true#new_record?
  end


  #Для доступа к current_user в моделях
  def self.current
    # Thread.current[:user]
    @@current_user
  end
  def self.current=(user)
    # Thread.current[:user] = user
    @@current_user = user
  end

  # before_save :see


  # def see
  #   binding.pry
  #   a = self.name 
  # end


  def admin?
  	has_role?("admin")       	
  end       

  def moder?
    has_role("moder")
  end

  def resourse_editor? resourse
    admin? || moder? || id == resourse.user_id
  end


  def is_stuff?
  	has_role?("admin") || has_role?("moder")	   	   	
  end	   	   

  def in_jury?
    self.jury && self.jury.count > 0
  end

  def is_writer?
    self.has_role?("writer")    
  end

  def full_name
    "#{name} #{last_name}"
  end

  def profile_empty?
    last_name.blank? || adress.blank? || zip_code.blank? || city.blank? || country.blank?
  end

  def confirm!
    skip_confirmation!
    save!
  end

  def age
    birth_date.nil? ? 0 : (Date.today - birth_date).to_i / 365
  end

  def adult?
    age > 18
  end

  def face
    avatar_url(:thumb) || Gravatar.new(email).image_url(size: 50)
  end

  def country_name
    if country
      c = ISO3166::Country[country]
      c.translations[I18n.locale.to_s] || c.name if c
    end
  end

  def birth_date_valid?
    # binding.pry
  end  

end
