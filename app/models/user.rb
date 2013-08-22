class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  def admin?
  	has_role?("admin")       	
  end       


  def is_stuff?
  	has_role?("admin") || has_role?("moder")	   	   	
  end	   	   


end
