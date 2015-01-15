class CommentsController < ApplicationController
  skip_before_filter :authenticate_user!
  before_filter :load_commentable, except: [:destroy]
  before_action :set_comment, only: [:update, :destroy]


  def create
    # @comment = @commentable.comments.build(params[:comment])  
    # @comment = Comment.new(comment_params)
    # @comment.user_id = current_user.id
    # @comment.commentable = @commentable
    # @comment.save

    @comment = Comment.create_comment(comment_params, @commentable, current_user.id)
    @commentable.mark_as_unseen if @commentable.respond_to?(:mark_as_unseen)
  
    
    respond_to do |format|
      if @comment.save
        format.html { redirect_to :back }
      else
        format.html { redirect_to :back, notice: @comment.errors.messages[:comment].try(:first)}
      end
    end

  end

  def update
  
  end

  def destroy
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
      # @commentable = prefix+"_id"
      @model = prefix.camelize.constantize
      
      #TODO: возможно вынести отдельно
      @commentable = if @model.respond_to?(:friendly)
        @model.friendly.find(params[prefix+"_id"])
      else
        @model.find(params[prefix+"_id"])
      end
       

    end


     def comment_params
      params.require(:comment).permit(:title, :user_id,:comment)
    end

end
