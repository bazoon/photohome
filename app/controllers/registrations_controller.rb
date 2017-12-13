class RegistrationsController < Devise::RegistrationsController
  before_filter :update_sanitized_params, if: :devise_controller?
  # prepend_before_action :check_captcha, only: [:create]


  # layout "user_profile_layout", except: [:new]

  def update_sanitized_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :last_name, :login, :about, :email, :country, :password, :password_confirmation,:avatar,:terms_of_service, :birth_date])
  end


 protected

    def after_update_path_for(resource)
      user_profile_path(resource)
    end
private
  def check_captcha
    if verify_recaptcha
      true
    else
      respond_to do |format|
        format.html { redirect_to :back, notice:  "Неправильная каптча!" }
      end
    end
  end

end
