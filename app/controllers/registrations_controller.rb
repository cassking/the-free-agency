class RegistrationsController < ApplicationController
  before_action :authorize_user
  def index
    binding.pry
    @users = User.all
  end

  def destroy

  end

  protected
  def authorize_user
    if !user_signed_in? || !current_user.role=="admin"
      raise ActionController::RoutingError.new("Not Found")
    end
  end
end
