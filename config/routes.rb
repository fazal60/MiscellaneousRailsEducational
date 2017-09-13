Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'hello_world', to: 'hello_world#index'
  get 'welcome/index'
  get 'users/login'
  post 'users/login'
  post 'users/checkLogin'
  root 'welcome#index'

  resources :users
  resources :signup
  resources :sessions
end
