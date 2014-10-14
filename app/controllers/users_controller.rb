class UsersController < ApplicationController
  before_filter :authenticate_user!

  

  def index

    authorize! :index, @user, :message => I18n.t(:access_denied) 
    
<<<<<<< HEAD
    role_id = params[:users][:role_id] if params[:user]
=======
    role_id = params[:users][:role_id]
>>>>>>> c12e3fe20b9a8e04febd2a480ceac0975a8a9922
    # binding.pry

    if role_id
      @users =  User.includes(:roles).where(roles: {id: role_id }).paginate(:page => params[:page], per_page: 25)
    else
      @users = User.includes(:roles).paginate(:page => params[:page], per_page: 25)
    end

    
  end

  def select_roles
    @roles = Role.all
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

  def show
    @user = User.friendly.find(params[:id])
    @letter = Letter.new
    @letter.user = @user
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
  
end