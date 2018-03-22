class Api::V1::VotesController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def create
    @vote = Vote.create(vote_params)
    @vote.user = current_user
    @comment = Comment.find(params[:comment_id])
    @votes = @comment.votes
    @sum = 0
    @votes.each { |vote| @sum+=vote.up_or_down }
    # binding.pry
    render json: { votecount: @sum, votes: @votes, vote: @vote }
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
