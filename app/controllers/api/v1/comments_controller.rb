class Api::V1::CommentsController < ApplicationController
  def index
    @comments = Comment.all
  end
end
