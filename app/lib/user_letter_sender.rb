class UserLetterSender
  
  def initialize(from_user, to_user)
    @from_user = from_user
    @to_user = to_user
  end


  def send_letter(title, content)
    letter = Letter.create!(user_id: @from_user.id, title: title, content: content)
    Letter::Person.create!(letter_id: letter.id, user_id: @to_user.id) 
  end
  
  
end