class Admin::AgePolicy < ActiveRecord::Base

  has_many :photos

  def name
    "#{self.age}+"
  end

  

end
