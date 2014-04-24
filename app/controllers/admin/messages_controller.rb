class Admin::MessagesController < Admin::BaseController
  
  before_action :set_message, only: [:show, :edit, :update, :destroy]
  

def index
  @messages = Message.all.order(:status_id)
end

  
def show
end  

def edit
  
end


def update
  respond_to do |format|
    if @message.update(message_params)
      format.html { redirect_to admin_messages_url, notice: 'Message was successfully updated.' }
      format.json { head :no_content }
    else
      format.html { render action: 'edit' }
      format.json { render json: @message.errors, status: :unprocessable_entity }
    end
  end
end

def destroy
  @message.destroy
  respond_to do |format|
    format.html { redirect_to admin_messages_url }
    format.json { head :no_content }
  end
end


private
  # Use callbacks to share common setup or constraints between actions.
  def set_message
    @message = Message.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def message_params
    params.require(:message).permit(:title, :content, :user_id, :status_id, :reason_id)
  end




end
