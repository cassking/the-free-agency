Rails.application.routes.draw do
  root "static_pages#index"
  devise_for :users
  resources :dashboard, only: [:index]
  match 'users/:id' => 'dashboard#destroy', :via => :delete, :as => :admin_destroy_user

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :teams, only: [:index, :show]
      resources :players, only: [:index, :show] do
        resources :comments, only: [:create, :destroy]
      end
    end
  end
  get '*path', to: 'static_pages#index'
end
