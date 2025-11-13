Rails.application.routes.draw do
  # Devise（セッションはスキップして、独自 API を使う）
  devise_for :users, skip: [:sessions]
  namespace :api do
    # 認証
    get    "health_check", to: "health_check#index"
    get    "current_user", to: "sessions#me"
    post   "login",        to: "sessions#create"
    delete "logout",       to: "sessions#destroy"
    # カテゴリ CRUD
    resources :categories                                      #カテゴリ一覧
    get "categories_with_counts", to: "categories#with_counts" #カテゴリ数
    # 投稿（index, create のみ想定）
    resources :posts, only: [:index, :create] do
      member do
        patch :hide     # /api/posts/:id/hide   投稿者自身が非表示
        patch :unhide   # /api/posts/:id/unhide 管理者が再表示
      end
    end
    get "posts/admin_index", to: "posts#admin_index"
    # 訪問管理
    get "current_visitor"  , to: "visitors#show"
    # ログ汚染対策
    get "/ws", to: proc { [200, {}, [""]] }
  end
end