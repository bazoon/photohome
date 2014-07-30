class HomeController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:index]

  def index

    setting = Admin::Setting.includes(:photos).first
    @setting_decorator = Admin::SettingDecorator.new(setting) 

    # @last_photos = Photo.where(published: true).last(4)
    @last_photos = Photo.last_published(4)
    # fresh_when(setting)

  end


  def test
    @photos = Photo.all


  end


end
