class Letter < ActiveRecord::Base
  belongs_to :user
  has_many :people
  acts_as_commentable

  validates :user_id, presence: true
 

  attr_reader :people_tokens

  def people_tokens=(tokens)

    self.people.delete_all  
    self.save!

    # raise Exception
    
    tokens.split(",").each do |user_id|
      letter_user = Letter::Person.create!(letter_id: self.id, user_id: user_id)    
    end

  end
  

  def recipient_names
    people.map { |person| person.user.full_name  }
  end

  def from
    user && user.full_name 
  end

  def recipients
    people.map(&:user)
  end

end
