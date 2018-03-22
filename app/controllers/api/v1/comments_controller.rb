class Api::V1::CommentsController < ApplicationController
  before_action :authenticate_user!

  def index
    @signed_in = user_signed_in?
    if_admin = false
    if @signed_in
      if_admin = current_user.admin?
    end
    @comments = Comment.where(player_id: params[:player_id])
    @comments_sorted = @comments.sort_by do |comment|
      comment.created_at
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
    @comments_sorted.reverse!
    @comments_with_username = @comments_sorted.map do |comment|
      { comment: comment,
        username:comment.user.username,
        votes: comment.votes
      }
    end
    render json: {
      comments: @comments_with_username,
      signed_in: @signed_in,
      userVotes: @userVotes,
      if_admin: if_admin,
      user_id: current_user.id
    }
    binding.pry
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user
    @comment.player = Player.find(params[:player_id])
    if @comment.save
      @comment_return = {
        comment: @comment,
        username:@comment.user.username,
        votes: @comment.votes
      }
      render json: { comment: @comment_return }
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    player = Player.find(params[:player_id])
    if comment.destroy
    end
    @comments_sorted.reverse!
    @comments_with_username = @comments_sorted.map do |comment|
      [comment, comment.user.username]
    end
    render json: { player: player, comments: @comments_with_username }
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
