class CacheOperationsController < ApplicationController
  

  def destroy
  	drop_all
  end


private

	def drop_all
		begin
			Rails.cache.clear	
		rescue Exception => e
			render text: "Произошла ошибка (неизвестно точно какая)"
		end
  	


  end

end
