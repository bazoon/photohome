class Document < ActiveRecord::Base
  acts_as_votable

  enum status: { "not_for_vote" => 0, "voting" => 1, "accepted" => 2, "rejected" => 3, "open" => 4 }

  scope :active, -> { Document.voting }

  def self.need_too_vote?(user)

    not active.all? do |document|
      user.voted_for?(document)
    end

  end

  def vote(user)
    user.likes(self)
  end

  def downvote(user)
    user.dislikes(self)
  end


  def accept
    accepted! if voting?    
  end

  def reject
    rejected! if voting?
  end

  def likes
    get_likes.count
  end

  def dislikes
    get_dislikes.count
  end

end
