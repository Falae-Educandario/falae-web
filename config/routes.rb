Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"

  #root 'sessions#new'
  root 'header_pages#home'
  get '/home', to: 'header_pages#home'
  get '/about', to: 'header_pages#about'
  get '/contact', to: 'header_pages#contact'
  get '/privacy', to: 'header_pages#privacy'
  post '/csp-report', to: 'csp_reports#create'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  resources :users, except: [:index, :destroy] do
    member do
      get 'photo'
      get 'change_email'
      get 'change_password'
      get 'import_spreadsheet'
      get 'private_items', to: 'items#private'
      get 'filter_items', to: 'items#filter'
      post 'add_spreadsheet'
      patch 'update_email'
      patch 'update_password'
    end
    resources :spreadsheets do
      get 'export'
      get 'export_data'
      get 'import_page'
      post 'add_page'
      resources :pages do
        resources :items do
          member do
            get 'image'
          end
        end
        member do
          get 'add_item'
          get 'edit_item'
          get 'export'
          get 'export_data'
          get 'pdf'
          get 'search_item'
          post 'add_to_page'
          put 'swap_items'
          put 'update_item'
          delete 'remove_item'
        end
      end
    end
    resources :items do
      member do
        get 'image'
        get 'pdf'
      end
    end
  end

  resources :account_activations, only: [:edit]
  resources :password_resets, only: [:new, :create, :edit, :update]

  # ADDED
  get '/items/search', to: 'items#search'
end
