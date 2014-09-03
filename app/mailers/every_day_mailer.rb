class EveryDayMailer < ActionMailer::Base
  default from: "domfoto72@gmail.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.every_day_mailer.send_daily_news.subject
  #

  def send_daily_news
    @info = EveryDayInfo.new
    

    
    mail(to: "vith@yandex.com", subject: 'Photohome message !')

  end

   def welcome_email(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: @user.email, subject: 'Welcome to My Awesome Site')
  end
end
