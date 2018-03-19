class Api::V1::CommentsController < ApplicationController
  def new
    @comment = Comment.new
  end
end
