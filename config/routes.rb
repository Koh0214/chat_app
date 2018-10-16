Rails.application.routes.draw do
  get 'users/index'
  get 'users/show'

  get '/users/search', to: 'messages#index' # https://beautifulajax.dip.jp/?p=1571 ルーティングの設定

  devise_for :users
  resources :users, :only => [:index, :show]
  namespace :api, { format: 'json' } do
    resources :messages
    resources :users
    resources :friendships, :only => [:create]
  end
  root 'messages#index'
end
