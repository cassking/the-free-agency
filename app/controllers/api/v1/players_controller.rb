class Api::V1::PlayersController < ApplicationController
  def index
    render json: Player.all
  end

  def show
    @player= Player.find(params[:id])
    @comments = Comment.where(player_id: params[:id])
    @team = @player.team
    render json: { player: @player, comments: @comments, team: @team }
  end
end
