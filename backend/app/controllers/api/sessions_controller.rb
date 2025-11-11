class Api::SessionsController < Api::ApplicationController
  skip_before_action :verify_authenticity_token
  respond_to :json

  # POST /api/login
  def create
    unless params[:user]
      return render_error(
        code: "INVALID_REQUEST",
        message: "ユーザー情報が送信されていません。",
        status: :bad_request
      )
    end
    # メール・パスワードが空の場合
    email = params[:user][:email]
    password = params[:user][:password]
    if email.blank? || password.blank?
      return render_error(
        code: "EMPTY_FIELDS",
        message: "メールアドレスとパスワードを入力してください。",
        status: :bad_request
      )
    end
    # メールアドレス存在確認
    user = User.find_by(email: email)
    unless user
      return render_error(
        code: "EMAIL_NOT_FOUND",
        message: "メールアドレスが存在しません。",
        status: :unauthorized
      )
    end
    # パスワードが誤り
    unless user.valid_password?(password)
      return render_error(
        code: "INVALID_PASSWORD",
        message: "パスワードが間違っています。",
        status: :unauthorized
      )
    end
    # ログイン成功
    sign_in(user)
    render json: {
      message: "ログイン成功",
      user: {
        id: user.id,
        email: user.email
      }
    }, status: :ok
  end

  # GET /api/me
  def me
    if user_signed_in?
      render json: {
        message: "ログイン中",
        user: {
          id: current_user.id,
          email: current_user.email
        }
      }, status: :ok
    else
      render_error(
        code: "NOT_LOGGED_IN",
        message: "ログインしてください。",
        status: :unauthorized
      )
    end
  end

  # エラーリスポンス共通化
  private
  def render_error(code:, message:, status:)
    render json: {
      error: {
        code: code,
        message: message
      }
    }, status: status
  end
end
