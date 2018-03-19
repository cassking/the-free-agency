class Api::V1::PlayersController < ApplicationController
  def index
    render json: Player.all
  end

  def show
    @signed_in = user_signed_in?
    @player= Player.find(params[:id])
    @comments = Comment.where(player_id: params[:id])
    @comments_sorted = @comments.sort_by { |comment| comment.created_at}.reverse
    @comments_with_username = @comments_sorted.map { |comment| [comment, comment.user.username] }
    @stat = Stat.find_by(player_id: params[:id])
    render json: { player: @player, comments: @comments_with_username, stat: @stat, signed_in: @signed_in }
  end
end
