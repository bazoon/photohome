# Этот класс служит для добавления разрешенных параметров в модель User
# подробнее тут http://blog.12spokes.com/web-design-development/adding-custom-fields-to-your-devise-user-model-in-rails-4/

class User::ParameterSanitizer < Devise::ParameterSanitizer
    private
    def account_update
        default_params.permit(:name, :email, :password, :password_confirmation, :current_password,:avatar)
    end
end