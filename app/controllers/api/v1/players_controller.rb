class Api::V1::PlayersController < ApplicationController
  def index
    render json: Player.all
  end

  def show
    @signed_in = user_signed_in?
    @player= Player.find(params[:id])
    @comments = Comment.where(player_id: params[:id])
    @comments_sorted = @comments.sort_by do |comment|
      comment.created_at
    end
    @comments_sorted.reverse!
    @comments_with_username = @comments_sorted.map do |comment|
      {
        comment: comment,
        username:comment.user.username,
        votes: comment.votes
      }
    end
    @stat = Stat.find_by(player_id: params[:id])
    team_name = @player.team.name
    team_id = @player.team.id
    render json: {
      player: @player,
      comments: @comments_with_username,
      stat: @stat,
      signed_in: @signed_in,
      team_name: team_name,
      team_id: team_id
    }
  end
end
