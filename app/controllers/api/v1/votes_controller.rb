class Api::V1::VotesController < ApplicationController
  before_action :authenticate_user!
  def index
  end

  def create
    @vote = Vote.new(vote_params)
    @vote.user = current_user
    @dbVote = Vote.where('user_id = ? AND comment_id = ?', @vote.user_id, @vote.comment_id)[0]
    @dbVote.up_or_down = @vote.up_or_down if @dbVote
    @vote.save

    @comments = Comment.where(player_id: params[:player_id])
    @comments_with_username = @comments.map do |comment|
      { comment: comment,
        username:comment.user.username,
        votes: comment.votes
      }
    end
    @userVotes =[];
    @comments.each do | comment |
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
