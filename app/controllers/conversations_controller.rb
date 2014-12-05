class ConversationsController < ApplicationController
  
  layout "user_profile_layout"
  helper_method :mailbox, :conversation
  before_action :load_user 
  before_action :load_box, only: [:index, :trash]

  def reply
    # binding.pry
    body, subject = *message_params(:body, :subject)
    current_user.reply_to_conversation(conversation, body)
    redirect_to user_conversation_path(@user, conversation)
  end

  def trash
    conversation.move_to_trash(current_user)
    # binding.pry
    redirect_to user_conversations_path(@user, box: @box || :inbox)
  end

  def untrash
    conversation.untrash(current_user)
    redirect_to user_conversations_path(@user, box: :trash)
  end

  def index
    @current_box = mailbox.send(@box)
  end

  def create
    recipient_ids = conversation_params(:recipients).split(',')
    recipients = User.where(id: recipient_ids).all
    conversation = current_user.
      send_message(recipients, *conversation_params(:body, :subject)).conversation
    redirect_to user_conversation_path(@user, conversation)
  end

  def admin_create
    recipient_ids = conversation_params(:recipients).split(',')
    recipients = User.where(id: recipient_ids).all
    conversation = current_user.
      send_message(recipients, *conversation_params(:body, :subject)).conversation
    redirect_to :back, notice: t('message_sent')
  end

  def new
  end

  def show
    conversation.mark_as_read(current_user)
  end


  private

  def mailbox
    @mailbox ||= current_user.mailbox
  end

  def conversation
    @conversation ||= mailbox.conversations.find(params[:id])
  end

  def load_user
    @user = User.friendly.find(params[:user_id])
  end

  def conversation_params(*keys)
    fetch_params(:conversation, *keys)
  end

  def message_params(*keys)
    fetch_params(:message, *keys)
  end

  def fetch_params(key, *subkeys)
    params[key].instance_eval do
      case subkeys.size
      when 0 then self
      when 1 then self[subkeys.first]
      else subkeys.map{|k| self[k] }
      end
    end
  end

  def load_box
    @box = %w(inbox sentbox trash).find { |e| e == params[:box] }
  end

end
