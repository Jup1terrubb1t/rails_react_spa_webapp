class Api::PostsController < Api::ApplicationController
  before_action :authenticate_user!, only: [:unhide]  # 管理者専用

  # 投稿一覧:一般ユーザー用(非表示含まない)
  def index
    @posts = Post.where(category_id: params[:category_id], hidden: false)
    render json: @posts
  end
  # 投稿一覧:管理者用(非表示含まない)
  def admin_index
    posts = Post.where(category_id: params[:category_id])
    render json: posts
  end
  # 投稿作成:一般ユーザー用
  def create
    Rails.logger.info("=== 投稿作成時のセッション ===")
    Rails.logger.info("session[:visitor_token] (before): #{session[:visitor_token]}")
    @post = Post.new(post_params)
    @post.session_token = session[:visitor_token] ||= SecureRandom.hex(16)
    Rails.logger.info("session[:visitor_token] (after): #{session[:visitor_token]}")
    @post.hidden = false
    if @post.save
      render json: @post, status: :created
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
    end
  end
  # 投稿非表示：投稿者用
  def hide
    post = Post.find(params[:id])
    Rails.logger.info("セッション確認")
    Rails.logger.info("post.session_token: #{post.session_token}")
    Rails.logger.info("session[:visitor_token]: #{session[:visitor_token]}")
    Rails.logger.info("Cookie全体: #{request.cookies.inspect}")
    if post.session_token == session[:visitor_token]
      post.update(hidden: true)
      render json: { message: "非表示にしました" }
    else
      render json: { error: "権限がありません" }, status: :forbidden
    end
  end
  # 投稿再表示:管理者用
  def unhide
    post = Post.find(params[:id])
    post.update(hidden: false)
    render json: { message: "再表示しました" }
  end

  private
  def post_params
    params.require(:post).permit(:name, :email, :title, :body, :category_id)
  end
end
