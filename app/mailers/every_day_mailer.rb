class EveryDayMailer < ActionMailer::Base
  # default from: "vith@yandex.ru"
  default from: 'robot@domfoto72.ru'

  # include Sidekiq::Mailer
  
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
