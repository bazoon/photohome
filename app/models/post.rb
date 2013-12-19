class Post < ActiveRecord::Base

  belongs_to :user
  belongs_to :age_policy, class_name: 'Admin::AgePolicy'


  def author
    user && user.full_name
  end


  def age_policy_age
    age_policy && age_policy.age
  end

end
