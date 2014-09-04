class EveryDayMailer < ActionMailer::Base
  default from: "domfoto72@gmail.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.every_day_mailer.send_daily_news.subject
  #

  def send_daily_news(user, info)
    @info = info
    mail(to: user.email, subject: 'Новости Тюменского дома фотографии')
  end

  
end
