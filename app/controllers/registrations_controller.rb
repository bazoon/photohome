class RegistrationsController < Devise::RegistrationsController
  before_filter :update_sanitized_params, if: :devise_controller?

  def update_sanitized_params
    devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(:name, :about, :email, :country, :password, :password_confirmation,:avatar)}
  end


 protected

    def after_update_path_for(resource)
      user_profile_path(resource)
    end

end
