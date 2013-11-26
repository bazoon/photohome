class Letter < ActiveRecord::Base
  belongs_to :user
  has_many :letter_users
  acts_as_commentable

  validates :user_id, presence: true

  attr_reader :letter_users_tokens

  def letter_users_tokens=(tokens)

    self.letter_users.delete_all  
    self.save

    # raise Exception
    
    tokens.split(",").each do |user_id|
      letter_user = LetterUser.create!(letter_id: self.id, user_id: user_id)    
    end

  end


  def recipient_names
    letter_users.map { |lu| lu.user.full_name  }
  end

  def from
    user && user.full_name 
  end

  def recipients
    letter_users.map(&:user)
  end


end
