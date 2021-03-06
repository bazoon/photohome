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
      link_to("#{I18n.t('mail_alert')} (#{@count})", user_conversations_path(current_user, box: :inbox), class: "letter-alert-link") if @count > 0
    end
  end

  def voiting_in_progress(current_user)
    return unless current_user && current_user.has_role?(:cluber)
    need ||= Document.need_too_vote?(current_user)
    return unless need
    link_to('Голосуй, а то проиграешь!', documents_path)
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