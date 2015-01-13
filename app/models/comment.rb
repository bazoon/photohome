class Comment < ActiveRecord::Base

  include ActsAsCommentable::Comment

  belongs_to :commentable, :polymorphic => true, touch: true #for caching

  default_scope -> { order('created_at ASC') }


  # NOTE: install the acts_as_votable plugin if you
  # want user to vote on the quality of comments.
  #acts_as_voteable

  # NOTE: Comments belong to a user
  belongs_to :user
  delegate :full_name, to: :user
  def self.create_comment(params, commentable, user_id)
    comment = new(params)
    comment.user_id = user_id
    comment.commentable = commentable
    comment
  end

end
