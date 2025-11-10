# Rails APIコントローラーを作成
# - Baseを継承することで、通常のRailsの機能（Cookie・Session・CSRF）が有効
module Api
  class ApplicationController < ActionController::Base
    # API コントローラーではBaseの機能が一部OFF扱いとなるため以下明記
    # Rails に Cookie を扱わせる機能をON
    include ActionController::Cookies
    # セキュリティ関連の処理を使える状態をON
    include ActionController::RequestForgeryProtection
    # CSRFトークンなしのPOSTを許可 (SPAからのAPIリクエストはCSRFトークンがつかない)
    protect_from_forgery with: :null_session
  end
end