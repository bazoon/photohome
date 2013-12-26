class UserMailer < ActionMailer::Base
  default from: 'root@37.139.14.201'


  def welcome_email(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end

end
