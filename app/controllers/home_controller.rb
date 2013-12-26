class HomeController < ApplicationController

  def index

    setting = Admin::Setting.includes(:photos).first
    

    if setting 
      @setting_decorator = Admin::SettingDecorator.new(setting) 
      @last_photos = Photo.last(4) 

    else



      render text: ""
    end

  end


  def test
    UserMailer.welcome_email(current_user)    
  end


end
