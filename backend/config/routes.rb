Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    get "health_check", to: "health_check#index"
  end
end