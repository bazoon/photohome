class UserSubscriptionsController < ApplicationController

  before_action :set_user_subscription, only: [:show, :edit, :update, :destroy]
  before_action :set_user, only: [:index,:show, :edit, :new, :create,:update]
  
  layout "user_profile_layout"


  # GET /user_subscriptions
  # GET /user_subscriptions.json
  def index
    @user_subscriptions = current_user && current_user.user_subscriptions.load
  end



  # GET /user_subscriptions/1
  # GET /user_subscriptions/1.json
  def show
  end

  # GET /user_subscriptions/new
  def new
    @user_subscription = UserSubscription.new
    @user_subscription.user_id = @user.id
    @url = user_subscriptions_path
    @method = :post
  end

  # GET /user_subscriptions/1/edit
  def edit
    @url = user_subscription_path
    @method = :patch
  end

  # POST /user_subscriptions
  # POST /user_subscriptions.json
  def create
    @user_subscription = UserSubscription.new(user_subscription_params)
    @user_subscription.user_id = current_user.id
    
    
    respond_to do |format|
      if @user_subscription.save
        format.html { redirect_to user_subscriptions_path(current_user), notice: 'user_subscription was successfully created.' }
        format.json { render action: 'show', status: :created, location: @user_subscription }
      else
        format.html { render action: 'new' }
        format.json { render json: @user_subscription.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /user_subscriptions/1
  # PATCH/PUT /user_subscriptions/1.json
  def update
    respond_to do |format|
      if @user_subscription.update(user_subscription_params)
        format.html { redirect_to user_subscriptions_path(current_user), notice: 'user_subscription was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @user_subscription.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /user_subscriptions/1
  # DELETE /user_subscriptions/1.json
  def destroy
    @user_subscription.destroy
    respond_to do |format|
      format.html { redirect_to user_subscriptions_url(current_user) }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user_subscription
      @user_subscription = UserSubscription.find(params[:id])
    end

   def set_user
      @user = User.friendly.find(params[:user_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_subscription_params
      params.require(:user_subscription).permit(:kind, :user_id)
    end

end
