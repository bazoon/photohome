Photohome::Application.routes.draw do



  get "like/like/:competition_photo_id", to: 'like#like', as: :like

  get "ajax/users"
  get "gallery/index"
  get '/gallery/show/:photo_id', to: 'gallery#show', as: :gallery_show
  
 
  mount RedactorRails::Engine => '/redactor_rails'

  post "upload/get_image"
  get "photo_ajax/theme_tokens"

  root :to => "home#index"


    
   scope "(:locale)", locale: /en|ru/ do

  devise_for :users, :controllers => {:registrations => "registrations"}
  	
    resources :novelties do
      collection do
        get 'list'
      end
    end  

    resources :topics

    
    concern :commentable do
      resources :comments
    end



    resources :photos do
        get 'view', as: :view
    end  

  	resources :users do
  		resources :photos, concerns: :commentable
      resources :messages, concerns: :commentable 
    end

  
 

    resources :competitions do
      member do
        get 'aply', as: :aply
        get 'choose_photo', as: :choose_photo
        get 'view_photos',as: :view_photos
      end  


      resources :competition_photos 

    end  


      
    get 'jury_choose_competition', to: 'jury#choose_competition',as: :jury_choose_competition
    post 'jury_view_photos', to: 'jury#view_photos', as: :jury_view_photos    
    post 'jury_rating', to: 'jury#rating', :as => :jury_rating




   # ADMIN Routes !!!
    namespace :admin do
      resources :messages,concerns: :commentable

      post 'final_rating', to: 'competitions#final_rating', :as => :final_rating

      resources :novelties  

      resources :competitions  do
        member do
          get 'view_posted',as: :view_posted 
          get 'stats',as: :stats 
        end  
        
        resources :competition_photos,only: :destroy,shallow: true
        resources :nominations
        resources :jury
      end  


      #Галлерея сайта
      resources :site_photos do


      end
      
      #Альбомы сайта
      resources :albums   

      resources :photos do
        member do 
          get 'publish',as: :publish
          get 'undelete',as: :undelete  

        end 

        collection do
          get 'deleted',as: :deleted
          get 'review',as: :review 
        end

      end  

        
    end
  

 
  end





  get 'user_profile/:locale/:user_id', to: 'user_profile#edit',as: :user_profile

end