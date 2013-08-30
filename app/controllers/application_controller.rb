# require "#{Rails.application.root}/lib/user_sanitizer.rb"

class User::ParameterSanitizer < Devise::ParameterSanitizer
    private
    def account_update
        default_params.permit(:name, :email, :password, :password_confirmation, :current_password,:avatar)
    end
end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_filter :authenticate_user!
  



  protect_from_forgery with: :exception
  
  before_filter :set_current_locale

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => exception.message
  end

	def default_url_options(options={})
	  logger.debug "default_url_options is passed options: #{options.inspect}\n"
	  { locale: I18n.locale } 
	end



protected
 
    def devise_parameter_sanitizer
  
      if resource_class == User
        User::ParameterSanitizer.new(User, :user, params)
      else
        super
      end
    
    end



	private

	def set_current_locale
	  current_locale = 'ru' # default one
	  current_locale = params[:locale] if params[:locale]  # or add here some checking 
	  I18n.locale = current_locale # if it doesn't work, add .to_sym    
	end



  



end
