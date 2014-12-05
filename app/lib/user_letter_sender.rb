class UserLetterSender
  
  def initialize(from_user, to_user)
    @from_user = from_user
    @to_user = to_user
  end


  def send_letter(title, content)
    @from_user.send_message(@to_user, content, title)
  end
  
  
end