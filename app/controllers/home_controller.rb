class HomeController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:index]

  def index

    setting = Admin::Setting.includes(:photos).first
    

    if setting 
      @setting_decorator = Admin::SettingDecorator.new(setting) 
      @last_photos = Photo.last(4) 
    else
      render text: ""
    end

    fresh_when(setting)

  end


  def test
    UserMailer.welcome_email(current_user)    
  end


end
