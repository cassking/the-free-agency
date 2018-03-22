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
      [comment, comment.user.username, comment.votes]
    end
     @votes =  Vote.where(id: params[:comment_id])
    render json: {
      comments: @comments_with_username,
      signed_in: @signed_in,
      votes: @votes
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
        [comment, comment.user.username]
      end
      @votes =  Vote.where(id: params[:comment_id])
      render json: { votes: @votes, comment: @comment, comments: @comments_with_username }
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
