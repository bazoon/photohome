class Post < ActiveRecord::Base

  belongs_to :user
  belongs_to :age_policy, class_name: 'Admin::AgePolicy'
  validates :age_policy, :title, presence: true

  extend FriendlyId

  friendly_id :title, use: :slugged

  def author
    user && user.full_name
  end


  def age_policy_age
    age_policy && age_policy.age
  end

end
