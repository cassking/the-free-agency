class DashboardController < ApplicationController
  before_action :authorize_user
  def index
    @users = User.all
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to dashboard_index_path, notice: 'User deleted' if @user.destroy
  end

  protected

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new('Not Found')
    end
  end
end
