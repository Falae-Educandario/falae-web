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
  root 'headers#home'
  get '/home', to: 'headers#home'
  get '/about', to: 'headers#about'
  get '/contact', to: 'headers#contact'
  get '/privacy', to: 'headers#privacy'
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
      get 'search_items', to: 'items#search'
      post 'add_spreadsheet'
      patch 'update_email'
      patch 'update_password'
      get 'test_form', to: 'spreadsheets#test_form'
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
          delete 'remove_item'
          get 'add_item'
          get 'edit_item'
          get 'export_data'
          get 'export'
          get 'pdf'
          get 'search_item'
          # get 'search_items'
          post 'add_to_page'
          put 'swap_items'
          put 'update_item'
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
  # get '/items/search', to: 'items#search'
end
