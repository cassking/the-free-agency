class Api::V1::PlayersController < ApplicationController
  def index
    render json: Player.all
  end

  def show

    @signed_in = user_signed_in?
    if_admin = false
    if @signed_in
      if_admin = current_user.admin?
    end
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
    render json: {
      player: @player,
      comments: @comments_with_username,
      stat: @stat,
<<<<<<< HEAD
      signed_in: @signed_in,
      #add up_down_vote
      team_name: team_name,
      admin: if_admin,
      user_id: current_user.id
=======
      signed_in: @signed_in
>>>>>>> de5461dd3b517357c78b59914d4b8cadb1b3b448
    }
  end

  def destroy
    comment=Comment.find(params[:id])
    comment.destroy
  end
end
