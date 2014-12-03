class Letter < ActiveRecord::Base
  belongs_to :user
  has_many :people, dependent: :destroy
  has_many :letter_views, dependent: :destroy
  acts_as_commentable


  # has_many :comments
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
  
  def mark_as_seen(letter_user)
    letter_views.find_or_create_by(user: letter_user).update(seen: true)
  end

  def mark_as_unseen
    letter_views.update_all(seen: false) 
  end  

  def self.unseen_letters_for(user)
    #Есть ли непрочитанные письма для пользователя?
    
    incoming_for(user).select { |letter| not user.saw?(letter) }
    

  end


  def self.incoming_for(user)
    @letters = Letter.includes(:people)
                     .joins(:people).where('letter_people.user_id = ?',
                      [user.id]).order(updated_at: :desc) +
                      user.letters.includes(:comments).joins(:people, :comments).order(updated_at: :desc)
    
   

  end

  def recipient_names
    people.map { |person| person.user.full_name if person.user }.compact
  end

  def from
    user && user.full_name 
  end

  def recipients
    people.map(&:user)
  end

end
