class Api::V1::VotesController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def create
    @vote = Vote.new(vote_params)
    @vote.user = current_user
    @dbVote = Vote.where(['user_id = ? AND comment_id = ?', @vote.user_id, @vote.comment_id])[0]
    if @dbVote
      @dbVote.up_or_down = @vote.up_or_down
      @dbVote.save
    else
      @vote.save
    end
    @comments = Comment.where(player_id: params[:player_id])
    @comments_sorted = @comments.sort_by do |comment|
      sum = 0
      comment.votes.each { |vote| sum += vote.up_or_down }
      sum
    end
    @comments_sorted.reverse!
    @comments_with_username = @comments_sorted.map do |comment|
      { comment: comment,
        username:comment.user.username,
        votes: comment.votes
      }
    end
    @userVotes =[];
    @comments_sorted.each do | comment |
      if comment.votes
        comment.votes.each do | vote |
          @userVotes << vote if (vote.user_id === current_user.id)
        end
      end
    end
    render json: {
      comments: @comments_with_username,
      userVotes: @userVotes
    }
  end

  def destroy
    render json:  { vote: Vote.destroy(params[:id]) }
  end

  private
  def vote_params
    params.require(:vote).permit(
      :comment_id,
      :up_or_down
    )
  end
end
