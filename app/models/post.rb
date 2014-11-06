class Post < ActiveRecord::Base

  belongs_to :user
  belongs_to :age_policy, class_name: 'Admin::AgePolicy'
  validates :age_policy, :title, presence: true
  scope :selected_ids, lambda {|s| s.nil? ? self.none :  where("id in (?)", s.split(",")) }

  extend FriendlyId

  ## FIXME: some
  friendly_id :title, use: :slugged

  def author
    user && user.full_name
  end


  def age_policy_age
    age_policy && age_policy.age
  end

end
