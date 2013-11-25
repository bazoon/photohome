class AjaxController < ApplicationController



  def users
    respond_to do |format|
      
      name = params[:q].mb_chars.capitalize

      users = User.where("name like ?",["%#{name}%"])
      # format.js { users.inspect}
      format.js {render json: users.map { |u| {:id => u.id, :name => u.full_name} }.to_json  }
    
    end 

  end


end
