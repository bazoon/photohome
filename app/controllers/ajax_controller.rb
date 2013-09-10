class AjaxController < ApplicationController



  def users
    respond_to do |format|
      
      name = params[:q].mb_chars.capitalize

      users = User.where("name like ?",["%#{name}%"])
      format.js {render json: users  }
    
    end 

  end


end
