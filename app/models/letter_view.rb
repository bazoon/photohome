class LetterView < ActiveRecord::Base
  belongs_to :user
  belongs_to :letter

  validates :user_id, :letter_id, presence: true


  
end
