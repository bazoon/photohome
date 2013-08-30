Photohome::Application.routes.draw do

  
  get "gallery/index"
 

  get '/gallery/show/:photo_id', to: 'gallery#show', as: :gallery_show
  
 
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


    # resources :photos

  	resources :users do
  		resources :photos, concerns: :commentable
      resources :messages, concerns: :commentable 
    end
  
    namespace :admin do
      resources :messages,concerns: :commentable
      resources :photos do
        member do 
          get 'publish',as: :publish
        end  
      end  

        
    end
  

 
  end





  get 'user_profile/:locale/:user_id', to: 'user_profile#edit',as: :user_profile

end