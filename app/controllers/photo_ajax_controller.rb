class PhotoAjaxController < ApplicationController
 

  def theme_tokens
  	respond_to do |format|
 
	

  		# tags = Photo.tag_counts_on(:themes).where("name like ?",["%#{params[:q]}%"])
  		# tags = tags.map {|tag| {id: tag.name, name: tag.name} }

			
  		# if tags.empty?
  		# 	tags = [id: "#{params[:q]}",name: "New: #{params[:q]}"]
   	# 	end	
       


 			format.js {render json: Photo.theme_tokens(params[:q])  }
          # format.js {render json: tags  }
  	
  	end	

  end


end
