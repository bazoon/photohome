class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  mount_uploader :avatar, AvatarUploader

  validates :name, :email, presence: true

  # validates :last_name, :adress, :zip_code, :city, :country, presence: true
  
  has_many :photos, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :jury,class_name: "Admin::Jury"
  has_many :letters, dependent: :destroy
  

  acts_as_tagger

  #Для доступа к current_user в моделях
  def self.current
    Thread.current[:user]
  end
  def self.current=(user)
    Thread.current[:user] = user
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

end
