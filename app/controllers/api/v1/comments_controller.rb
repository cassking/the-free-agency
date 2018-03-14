class Api::V1::CommentsController < ApplicationController
  def index
    render json: Comment.where(player_id: params(:player_id))

  end
end
