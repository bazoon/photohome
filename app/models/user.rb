class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  mount_uploader :avatar, AvatarUploader

  
  has_many :photos
  has_many :messages
  has_many :jury,class_name: "Admin::Jury"


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
    jury && jury.count > 0
  end

end
