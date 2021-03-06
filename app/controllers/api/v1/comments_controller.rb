class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @signed_in = user_signed_in?
    if_admin = false
    if_admin = current_user.admin? if @signed_in
    @comments = Comment.where(player_id: params[:player_id])
    @userVotes = []
    @comments.each do | comment |
      if comment.votes
        comment.votes.each do | vote |
          @userVotes << vote if (vote.user_id === current_user.id)
        end
      end
    end

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
    @signed_in = user_signed_in?
    render json: {
      comments: @comments_with_username,
      signed_in: @signed_in,
      userVotes: @userVotes,
      if_admin: if_admin,
      user_id: current_user.id
    }
  end

  def create
    @signed_in = user_signed_in?
    @comment = Comment.new(comment_params)
    @comment.user = current_user
    @comment.player = Player.find(params[:player_id])
    if @comment.save
      @comment_return = {
        comment: @comment,
        username:@comment.user.username,
        votes: @comment.votes
      }
      render json: { comment: @comment_return, signed_in: @signed_in }
    end
  end

  def destroy
    deleted_comment = Comment.find(params[:id])
    deleted_comment.destroy
    @comments = Comment.where(player_id: params[:player_id])
    @userVotes = []
    @comments.each do | comment |
      if comment.votes
        comment.votes.each do | vote |
          @userVotes << vote if (vote.user_id === current_user.id)
        end
      end
    end

    @comments_sorted = @comments.sort_by do |comment|
      sum = 0
      comment.votes.each { |vote| sum += vote.up_or_down }
      sum
    end
    @comments_sorted.reverse!
    @comments_with_username = @comments_sorted.map do |comment|
      { comment: comment,
        username:current_user.username,
        votes: comment.votes
      }
    end
    if deleted_comment.destroy
      @comment_return = {
        comments: @comments_with_username,
        userVotes: @userVotes
      }
      render json: { comment: @comment_return }
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
