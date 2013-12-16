class CommentsController < ApplicationController
   before_filter :load_commentable, except: [:destroy]
   before_action :set_comment, only: [:update, :destroy]
  

  def create
    
    # @comment = @commentable.comments.build(params[:comment])  
    # @comment = Comment.new(comment_params)
    # @comment.user_id = current_user.id
    # @comment.commentable = @commentable
    # @comment.save


    @comment = Comment.create_comment(comment_params, @commentable, current_user.id)
    
  
    
    respond_to do |format|
      if @comment.save
        format.html { redirect_to :back }
      else
        format.html { render :action => 'new' }
      end
    end
    
      # render :text => @commentable.inspect
    end

  def update
  
  end

  def destroy
    # render text: params[:id].inspect

    @comment.destroy
    respond_to do |format|
      format.html { redirect_to :back }
      format.json { head :no_content }
    end

  end



  private
    # Use callbacks to share common setup or constraints between actions.

    def set_comment
      @comment = Comment.find(params[:id])
    end


    def load_commentable
      prefix = params[:comment][:commentable]
      @commentable = prefix+"_id"
      @commentable = prefix.camelize.constantize.find(params[prefix+"_id"])
    end


     def comment_params
      params.require(:comment).permit(:title, :user_id,:comment)
    end

end
