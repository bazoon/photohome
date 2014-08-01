class Admin::AgePolicy < ActiveRecord::Base

  has_many :photos
  scope :adults, -> { Admin::AgePolicy.where(age: 18) }

  def name
    "#{self.age}+"
  end

  

end
