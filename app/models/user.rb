class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  
  has_many :photos
  has_many :messages


  def admin?
  	has_role?("admin")       	
  end       

  def comment_moderator? comment
    admin? || id == comment.holder_id
  end


  def is_stuff?
  	has_role?("admin") || has_role?("moder")	   	   	
  end	   	   


end
