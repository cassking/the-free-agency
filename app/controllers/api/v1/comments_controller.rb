class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!

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
      render json: { comment: @comment, comments: @comments_with_username }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body)
  end
end
