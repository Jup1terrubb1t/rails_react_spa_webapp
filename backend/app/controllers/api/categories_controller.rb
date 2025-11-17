class Api::CategoriesController < Api::ApplicationController
  # index と show は誰でもOK。create / update / destroy は管理者のみ
  before_action :authenticate_user!, except: [:index, :show]
  # GET /api/categories
  def index
    categories = Category.all
    render json: categories
  end
  # SHOW /api/categories/:id
  def show
    category = Category.find(params[:id])
    render json: category
  end
  # POST /api/categories（管理者専用）
  def create
    category = Category.new(category_params)
    if category.save
      render json: category, status: :created
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end
  # PUT /api/categories/:id（管理者専用）
  def update
    category = Category.find(params[:id])
    if category.update(category_params)
      render json: category
    else
      render json: { errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end
  # DELETE /api/categories/:id（管理者専用）
  def destroy
    category = Category.find(params[:id])
    category.destroy
    render json: { message: "削除しました" }
  end
  # COUNT categories/with_counts (管理者専用)
  # SELECT 
  # categories.id
  # categories.name
  # COUNT(post.id) AS total_posts,
  # SUM(CASE WHEN post.hidden) = false THEN 1 ELSE 0 END ) AS visible_posts,
  # SUM(CASE WHEN post.hidden) = true THEN 1 ELSE 0 END ) AS hidden_posts,
  # FROM categories
  # LEFT JOIN posts ON posts.category_id = categories.id
  # GROUP BY categories.id;
  def with_counts
    categories = Category
    .left_joins(:posts)
    .select("
      categories.id,
      categories.name,
      COUNT(posts.id) AS total_posts,
      SUM(CASE WHEN posts.hidden = false THEN 1 ELSE 0 END) AS visible_posts,
      SUM(CASE WHEN posts.hidden = true THEN 1 ELSE 0 END) AS hidden_posts
    ")
    .group("categories.id")

    render json: categories
  end
  private
  def category_params
    params.require(:category).permit(:name, :description)
  end
end
