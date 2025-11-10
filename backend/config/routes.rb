Rails.application.routes.draw do
  devise_for :users, skip: [:sessions] # api/loginを使用するためdevise独自のsessionを飛ばす
  namespace :api do #/apiは以下のコントローラーを使用
    get "health_check", to: "health_check#index"
    get "current_user", to: "sessions#current_user"
    post "login",       to: "sessions#create"
    get "/ws", to: proc { [200, {}, [""]] } # ログ汚染対策
  end
end