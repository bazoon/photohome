class Admin::PostPromotionController < Admin::BaseController
  before_action :set_post, only: [:edit]

def edit
	 @post.promote_as_main
    respond_to do |format|
      format.js {  }
    end  
end



private
	
	def post_type
		binding.pry
    params[:type].constantize
  end

	def set_post
		
    @post = Post.friendly.find(params[:id])
   end
end