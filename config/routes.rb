Photohome::Application.routes.draw do




  

  get "photo_ajax/theme_tokens"

  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}


    
  scope "(:locale)", locale: /en|ru/ do
  	resources :novelties
    resources :topics

  	resources :users do
  		resources :photos
  	end
    
  end

  get 'user_profile/:locale/:user_id', to: 'user_profile#edit',as: :user_profile

end