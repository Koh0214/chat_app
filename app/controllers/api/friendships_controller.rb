module Api
  class FriendshipsController < ApplicationController

    def index
    end

    def create
      @friendship = Friendship.create(friendship_params)
      render json: @friendship
    end

    private
      def friendship_params
        params.permit(:to_user_id, :from_user_id)
      end

  end
end
