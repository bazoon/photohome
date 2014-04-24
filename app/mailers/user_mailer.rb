class UserMailer < ActionMailer::Base
  add_template_helper(ApplicationHelper)
  default from: 'vith@yandex.ru'


  def welcome_email(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

  def message_email(user, competition_title, decision, answer)
    
    @competition_title = competition_title
    @decision = decision
    @answer = answer
    @user = user

    mail(to: @user.email, subject: 'Photohome message !')
  end  

end
