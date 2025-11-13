module Api
  class VisitorsController < ApplicationController
    def show
      # 既存セッションがあれば利用、なければ新規発行
      session[:visitor_token] ||= SecureRandom.hex(16)
      render json: { token: session[:visitor_token] }
    end
  end
end