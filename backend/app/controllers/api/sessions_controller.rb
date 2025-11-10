class Api::SessionsController < Api::ApplicationController
  skip_before_action :verify_authenticity_token
  respond_to :json

  # ログインAPI
  def create
    user = User.find_by(email: params[:user][:email])

    if user&.valid_password?(params[:user][:password])
      sign_in(user)
      render json: {
        message: "ログイン成功",
        user: { id: user.id, email: user.email }
      }
    else
      render json: {
        error: "メールアドレスまたはパスワードが違います"
      }, status: :unauthorized
    end
  end

  # ログイン中ユーザー情報
  def current_user
    if user_signed_in?
      render json: {
        id: current_user.id,
        email: current_user.email
      }
    else
      render json: {
        error: "ログインしてください"
      }, status: :unauthorized
    end
  end
end
