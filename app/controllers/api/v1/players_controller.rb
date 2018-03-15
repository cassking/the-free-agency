class Api::V1::PlayersController < ApplicationController
  def index
    binding.pry
    render json: Player.all
  end

  def show
    render json: Player.find(params[:id])
    render json: Comment.where(player_id: params[:id])
  end
  
end
