class LikeController < ApplicationController

 load_and_authorize_resource
 
  def like

    @competition_photo_id = params[:competition_photo_id]
    like = Like.where(user_id: current_user.id,competition_photo_id: @competition_photo_id)
    
    if like.blank?
      like = Like.create(user_id: current_user.id,competition_photo_id: @competition_photo_id)
      @down = true
    else
      like.first.destroy
      @down = false
    end

  end

end
