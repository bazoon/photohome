class Admin::Jury < ActiveRecord::Base

  belongs_to :user
  belongs_to :competition

  attr_reader :user_tokens


  def user_tokens=(tokens)
    # self.theme_list = tokens
    # self.save
  end

end
