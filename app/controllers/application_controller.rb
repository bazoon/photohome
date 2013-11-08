class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  
  # before_filter :authenticate_user!
  

  #Настраиваем доп параметры для модели, иначе они сохраняться не будут.
  #смотреть сюда http://stackoverflow.com/questions/16297797/add-custom-field-column-to-devise-with-rails-4
  # and here https://github.com/plataformatec/devise#strong-parameters
  
  before_action :configure_permitted_parameters, if: :devise_controller?




  

  protect_from_forgery with: :exception
  
  before_filter :set_current_locale

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, :alert => exception.message
  end

	def default_url_options(options={})
	  logger.debug "default_url_options is passed options: #{options.inspect}\n"
	  { locale: I18n.locale } 

	end




	private

	def set_current_locale
	  current_locale = 'ru' # default one
	  current_locale = params[:locale] if params[:locale]  # or add here some checking 
	  I18n.locale = current_locale # if it doesn't work, add .to_sym    
	end


 
  def configure_permitted_parameters
    registration_params = [:name, :email, :password, :password_confirmation]

    if params[:action] == 'update'
      devise_parameter_sanitizer.for(:account_update) { 
        |u| u.permit(registration_params << :current_password)
      }
    elsif params[:action] == 'create'
      devise_parameter_sanitizer.for(:sign_up) { 
        |u| u.permit(registration_params) 
      }
    end
  end
  



end
