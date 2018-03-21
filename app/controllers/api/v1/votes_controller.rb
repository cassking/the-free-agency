class Api::V1::VotesController < ApplicationController
  before_action :authenticate_user!
  def index
    render json: { votes: Vote.all }
  end

  def create
    @comment = Comment.find(params[:id])
    @vote = Vote.create(vote_params)
    @current_user = current_user
    render json: { current_user: @current_user }
    redirect_to  api_v1_player_comment_path(new_vote.comment.player)
  end

  def update
    @vote = Vote.find(params[:id])
    @vote.update_attributes(vote_params)
    render json: { vote: @vote }
  end

  def destroy
    render json:  { vote: Vote.destroy(params[:id]) }
  end

  private
  def vote_params
    params.require(:vote).permit(
      :user_id,
      :comment_id,
      :up_or_down
    )
  end

end
