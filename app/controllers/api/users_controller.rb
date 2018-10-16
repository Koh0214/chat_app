module Api
  class UsersController < ApplicationController

    def index
      # FIXME search_wordが空の時に時に全件取得になってしまっている

      # チャット画面：関係のある友達を全て取得
      if params[:search_word] == "" && request.path != "/api/users"
        @users = current_user.friends
      # 友達検索画面：search_wordが空の時に結果を消す
      elsif params[:search_word] == "" && request.path == "/api/users"
        @users = []
      # 友達検索画面：search_wordであいまい検索
      else
        @users = User.where('name LIKE ?', "%#{params[:search_word]}%").order('created_at DESC').limit(30)
      end
      render json: @users
    end

  end
end
