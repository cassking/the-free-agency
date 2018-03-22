class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @signed_in = user_signed_in?
    
    @comments = Comment.where(player_id: params[:player_id])
    @comments_sorted = @comments.sort_by do |comment|
      comment.created_at
    end
    @comments_sorted.reverse!
    @comments_with_username = @comments_sorted.map do |comment|
      { comment: comment,
        username:comment.user.username,
        votes: comment.votes
      }
    end
    @userVotes =[];
    @comments.each do | comment |
      if comment.votes
        comment.votes.each do | vote |
          if (vote.user_id === current_user.id)
            @userVotes << vote
          end
        end
    end

    end
    render json: {
      comments: @comments_with_username,
      signed_in: @signed_in,
      userVotes: @userVotes
    }
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user
    @comment.player = Player.find(params[:player_id])
    if @comment.save
      @comments = Comment.where(player_id: params[:player_id])
      @comments_sorted = @comments.sort_by do |comment|
        comment.created_at
      end
      @comments_sorted.reverse!

      @comments_with_username = @comments_sorted.map do |comment|
        [comment, comment.user.username, comment.votes]
      end
      render json: { comments: @comments_with_username }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end

  def vote_params
    params.require(:vote).permit(
      :user_id,
      :comment_id,
      :up_or_down
    )
  end
end
