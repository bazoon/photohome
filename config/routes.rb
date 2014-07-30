Photohome::Application.routes.draw do



  get "age_restriction/show"
  get "age_restriction/agreed"
  mount RedactorRails::Engine => '/redactor_rails'

  root :to => "home#index"

  concern :commentable do
    resources :comments
  end

       
  
  get "like/like/:competition_photo_id", to: 'like#like', as: :like
  get "ajax/users"
  get "ajax/articles"

  put 'ajax/test'

  get "gallery/index"
  get '/gallery/show/:photo_id', to: 'gallery#show', as: :gallery_show
  post "upload/get_image"
  get "photo_ajax/theme_tokens"
  get 'test' => "home#test", as: :test
  get 'jury_choose_competition', to: 'jury#choose_competition',as: :jury_choose_competition
  post 'jury_view_photos', to: 'jury#view_photos', as: :jury_view_photos    
  post 'jury_rating', to: 'jury#rating', :as => :jury_rating
 
  get 'user_profile/:locale/:user_id', to: 'user_profile#edit',as: :user_profile
  get 'user_cloud/:user_id', to: 'user_cloud#cloud', as: :user_cloud
    

   
  scope "(:locale)", locale: /en|ru/ do

    devise_for :users, :controllers => {:registrations => "registrations"}

      resources :author, only: [:index]
    	
      resources :novelties, concerns: :commentable, only: [:show,:new,:edit,:destroy] do
        collection do
          get 'list'
        end
      end  

      resources :articles, concerns: :commentable, only: [:show,:new,:edit,:destroy] do
        collection do
          get 'list'
        end
      end  

      #distinct path for viewing photo without comments, author ...
      resources :photos do
        get 'view', as: :view
        # put 'update_'
      end  

      get 'tagged_photos/user_id/:user_id/name/:name', to: 'photos#tagged_photos', as: :tagged_photos

    	resources :users do

        member do
          post 'confirm', as: :confirm
        end

      	resources :photos, concerns: :commentable 
        resources :messages, concerns: :commentable 
        resources :letters, concerns: :commentable 
        resources :incoming_letters, only: [:index, :show]
      end


      resources :site_photos, concerns: :commentable
    
      resources :competitions, only: [:index, :show] do

        member do
          get 'aply', as: :aply
          get 'choose_photo', as: :choose_photo
          get 'view_photos',as: :view_photos
        end  

        resources :photos, only: [:index, :destroy, :create], controller: 'competition_photos' 
        resources :requests, controller: "competition_request", shallow: true, only: [:show, :create] 
      end  

      # get "album/index"
      # get "album/show"

    resources :albums, only: [:index, :show]   
    
    get "/albums/:id/site_photo/:site_photo_id", to: 'albums#carousel', as: :album_carousel
    
    get '/site_photos/choose/:photo_id', to: 'site_photos#choose', as: :choose_site_photo     

    # TODO: 0 Make site_photo without admin prefix
  
   
      # ADMIN routes

      namespace :admin do

         put 'ajax/test'

        resources :messages, concerns: :commentable
        resources :banners      
        resources :banner_placements
        resources :settings


        
        resources :novelties, controller: "posts", type: "Novelty" do
          member do
            post 'promote'
          end

        end

        resources :articles, controller: "posts", type: "Article" do
          member do
          post 'promote' 
        end

        end
        resources :topics
        resources :age_policies

        resources :competitions do

          member do
            get 'view_posted',as: :view_posted 
            get 'stats',as: :stats 
          end  
          
          resources :competition_photos, only: :destroy, shallow: true

          resources :nominations
          resources :jury, only: [:index, :update, :destroy]
          

          resources :requests, controller: "competition_requests", only: [:index, :edit, :create, :update] ,shallow: true 

        end  

        put '/admin/competitions/:competition/jury', to: 'jury#update', as: :update_jury

        #It is done so because of rating plugin
        post 'final_rating', to: 'competitions#final_rating', :as => :final_rating



        #Галлерея сайта
        # resources :site_photos 

                
        #Альбомы сайта
        resources :albums do
          resources :site_photo
        end
        
       
        resources :photos, only: [:index, :show, :destroy,:edit,:update] do
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





    


end