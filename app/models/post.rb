class Post < ActiveRecord::Base

  belongs_to :user

  def author
    user && user.full_name
  end

end
