class UsersController < ApplicationController
  before_filter :authenticate_user!

  before_action :select_users, only: :index

  def index
    authorize! :index, @user, :message => I18n.t(:access_denied)
    @users = select_users
                .non_blocked
                .order('users.created_at desc')
                .paginate(page: params[:page], per_page: 25)
  end

  def select_roles
    @roles = Role.pluck(:name)
    @roles << 'unconfirmed'
  end

  def confirm
    authorize! :confirm, @user, :message => I18n.t(:access_denied)
    @user = User.friendly.find(params[:id])

    @user.skip_confirmation!
    if @user.save
      @text = I18n.t('confirmed')
    else
      @text = 'Error saving...'
    end

  end

  def unconfirm
    authorize! :unconfirm, @user, :message => I18n.t(:access_denied)
    @user = User.friendly.find(params[:id])
    @user.update_attributes(blocked: !@user.blocked)
    redirect_to :back
  end

  def show
    @user = User.friendly.find(params[:id])
    # @letter = Letter.new
    # @letter.user = @user
  end

  def update
    authorize! :update, @user, :message => I18n.t(:access_denied)
    @user = User.friendly.find(params[:id])

    @user.role_ids = params[:user]["role_ids"]

    # binding.pry

    # if @user.update_attributes(params[:user])
    # if @user.update_attributes(params[:user])
    if @user.save
      redirect_to users_path, :notice => "User updated."
    else
      redirect_to users_path, :alert => "Unable to update user. #{params[:user]["role_ids"]}"
    end
  end

  def destroy
    authorize! :destroy, @user, :message => I18n.t(:access_denied)
    user = User.friendly.find(params[:id])
    unless user == current_user
      user.destroy
      redirect_to users_path, :notice => "User deleted."
    else
      redirect_to users_path, :notice => "Can't delete yourself."
    end
  end


  # def user_params
  #   params.require(:user).permit(:name, :email, :country,:password, :salt, :encrypted_password,:avatar)
  # end

  private


  def select_users
    role_name = params[:roles][:name] if params[:roles]
    search = params[:search][:term] if params[:search]

    if role_name
      users_with_roles(role_name)
    elsif search
      users_by_search(search)
    else
      User.all
    end
  end

  def users_with_roles(role_name)
    if role_name.blank?
      User.without_role
    else
      role_name != 'unconfirmed' ? User.with_role(role_name) : User.unconfirmed
    end
  end

  def users_by_search(search)
    search.blank? ? User.all : User.search_by_last_name_or_email(search)
  end


end
