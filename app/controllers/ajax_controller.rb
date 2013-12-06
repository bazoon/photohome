class AjaxController < ApplicationController



  def users
    respond_to do |format|
      
      name = params[:q].mb_chars.capitalize

      users = User.where("name like ?",["%#{name}%"])
      # format.js { users.inspect}
      format.js {render json: users.map { |u| {:id => u.id, :name => u.full_name} }.to_json  }
    
    end 

  end


  def articles
    respond_to do |format|
      
      title = params[:q].mb_chars.capitalize

      articles = Article.where("title like ?",["%#{title}%"])
      # format.js { users.inspect}
      format.js {render json: articles.map { |a| {:id => a.id, :name => a.title} }.to_json  }
    
    end 

    
  end


end
