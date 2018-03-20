class Api::V1::VotesController < ApplicationController
  before_action :authenticate_user!
  def create
    @comment = Comment.find(params[:id])
    @new_vote = Vote.create(vote_params)
    render json: { up_or_down: @new_vote}
    redirect_to  api_v1_player_comment_path(new_vote.comment.player)
  end

  def update
  end

  def destroy
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
