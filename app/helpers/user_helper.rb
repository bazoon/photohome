module UserHelper
  
   include ActionView::Helpers

  def incoming_mail_icon
    count = current_user.mailbox.inbox(unread: true).count
    if count > 0
      content_tag(:span,count,class: "pull-right label label-warning",style: "margin-left: 15px")
    else
      ''
    end

  end

  def incoming_mail_alert
    if current_user
      @count = current_user.mailbox.inbox(unread: true).count
      link_to("#{I18n.t('mail_alert')} (#{@count})", user_incoming_letters_path(current_user), class: "letter-alert-link") if @count > 0
    end

  end


  def field_info(user, field, date = false)

    tds = unless date
      content_tag(:td, "#{I18n.t(field)}") + content_tag(:td, user.send(field))
    else
      date = user.send(field)
      content_tag(:td, "#{I18n.t(field)}") + content_tag(:td, I18n.l(date)) if date
    end

    content_tag(:tr, tds)	 
  end


end