class Admin::UserLetterSendersController < ApplicationController
  
  def show
    @user = User.friendly.find(params[:user_id])
    @letter = Letter.new
    @letter.user = @user
    respond_to do |format|
        format.js
    end
  end

  def create
    @letter = Letter.new(letter_params)


    respond_to do |format|
      if @letter.save
        format.html { redirect_to :back, notice: 'Letter was successfully created.' }
      else
        format.html { render action: 'new' }
      end
    end
  end

private

    def letter_params
      params.require(:letter).permit(:title, :content, :user_id, :people_tokens)
    end


end
