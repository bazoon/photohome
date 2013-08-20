Photohome::Application.routes.draw do


  root :to => "home#index"
  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :users


    
  scope "(:locale)", locale: /en|ru/ do
  	resources :novelties
  	resources :users
  end

end