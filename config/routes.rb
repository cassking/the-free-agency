Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  resources :registrations, only: [:index,:destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

end
