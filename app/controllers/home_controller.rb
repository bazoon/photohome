class HomeController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:index]

  def index

    setting = Admin::Setting.includes(:photos).first
    @setting_decorator = Admin::SettingDecorator.new(setting) 
    @last_photos = Photo.last(4)
    
    # fresh_when(setting)

  end


  def test
    # UserMailer.welcome_email(current_user)   

    # p = Photo.all
    # render json: p.select([:id])
    render text: ENV['HOST']

  end


end
