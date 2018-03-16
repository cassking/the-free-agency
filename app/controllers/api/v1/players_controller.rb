class Api::V1::PlayersController < ApplicationController
  def index
    render json: Player.all
  end

  def show
    @player= Player.find(params[:id])
    @comments = Comment.where(player_id: params[:id])
    @c = @comments.map {|comment| [comment, comment.user.username] }
    @stat = Stat.find_by(player_id: params[:id])
    render json: { player: @player, comments: @c, stat: @stat}
  end
end
