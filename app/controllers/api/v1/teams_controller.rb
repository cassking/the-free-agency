class Api::V1::TeamsController < ApplicationController
  def index
    render json: Team.all
  end

  def show
    @team = Team.find(params[:id])
    @players = Player.where(team_id: params[:id])
    render json: { team: @team, players: @players }
  end
end
