class Api::V1::VotesController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def create
    @comment = Comment.find(params[:comment_id])
    @vote = Vote.create(vote_params)
    #put binding pry here to check params
    @votes = @comment.votes
    #return comments & votes
    @voteCount =[]
    @votes.map do | vote_value |
      @voteCount << vote_value
    end
      binding.pry
    render json: {  vote_count: @voteCount }
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
