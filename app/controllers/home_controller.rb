class HomeController < ApplicationController
  skip_before_filter :authenticate_user!, only: [:index,:test]

  def index

    setting = Admin::Setting.first
    @setting_decorator = Admin::SettingDecorator.new(setting) 

    # @last_photos = Photo.where(published: true).last(4)
    @last_photos = Photo.last_published(4)
    # fresh_when(setting)

  end


  def test2

    
    Mailboxer::Conversation.destroy_all
    
    binding.pry
    Letter.all.each do |letter|

      

      conversation = Mailboxer::Conversation.create(subject: letter.title)

      recipient_ids = [letter.user_id]
      recipient_ids += letter.people.map(&:user_id)

      notification = Mailboxer::Notification.create!(type: 'Mailboxer::Message',
                    body: letter.content,sender_id: letter.user_id, subject: letter.title,
                    sender_type: 'User', conversation_id: conversation.id)
      
      

        Mailboxer::Receipt.create!(receiver_id: letter.user_id,
                    receiver_type: 'User', notification_id: notification.id,
                    mailbox_type: 'sentbox')


        letter.people.all.each do |person|
          Mailboxer::Receipt.create(receiver_id: person.user_id,
                    receiver_type: 'User', notification_id: notification.id,
                    mailbox_type: 'inbox')
      

      letter.comments.all.each do |comment|

        notification = Mailboxer::Notification.create!(type: 'Mailboxer::Message', 
                    body: comment.comment, sender_id: comment.user_id, subject: letter.title,
                    sender_type: 'User', conversation_id: conversation.id)

        Mailboxer::Receipt.create(receiver_id: comment.user.id,
                    receiver_type: 'User', notification_id: notification.id,
                    mailbox_type: 'sentbox')

        recipient_ids.each do |recipient_id|
          
            Mailboxer::Receipt.create(receiver_id: recipient_id,
                    receiver_type: 'User', notification_id: notification.id,
                    mailbox_type: 'inbox') if recipient_id != comment.user_id
            # binding.pry
          
        end



      end



    end


  end


end
