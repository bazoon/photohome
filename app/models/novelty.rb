class Novelty < ActiveRecord::Base
	belongs_to :user
  acts_as_commentable

	self.per_page = 10



end