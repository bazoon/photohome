Photohome::Application.routes.draw do

  
  mount RedactorRails::Engine => '/redactor_rails'
  post "upload/get_image"

  get "photo_ajax/theme_tokens"

  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}



    
   scope "(:locale)", locale: /en|ru/ do
  	
    resources :novelties do
      collection do
        get 'list'
      end
    end  

    resources :topics

    
    concern :commentable do
      resources :comments
    end

  	resources :users do
  		resources :photos, concerns: :commentable
      resources :messages, concerns: :commentable
  	end
  
  

 
  end





  get 'user_profile/:locale/:user_id', to: 'user_profile#edit',as: :user_profile

end