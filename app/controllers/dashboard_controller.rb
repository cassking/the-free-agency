class DashboardController < ApplicationController
  before_action :authorize_user, except: [:edit, :destroy]
  def index
    @users = User.all
  end

  def destroy
    @user = User.find(params[:id])
    @user.comments.each(&:destroy)
    if_admin = current_user.admin?
    @user.destroy
    if if_admin
      redirect_to dashboard_index_path, notice: 'User deleted' if @user.destroy
    else
      redirect_to '/', notice: 'User deleted' if @user.destroy
    end
  end

  def edit
    @user = current_user
  end

  protected

  def authorize_user
    if !user_signed_in? || !current_user.admin?
      raise ActionController::RoutingError.new('Not Found')
    end
  end
end
