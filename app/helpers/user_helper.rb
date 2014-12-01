module UserHelper
  
   include ActionView::Helpers

  def incoming_mail_icon
  
  
    count = Letter.joins(:people).where("seen = ? and letter_people.user_id = ?",false, current_user.id).count
    
    if count > 0
      content_tag(:span,count,class: "pull-right label label-warning",style: "margin-left: 15px")
    else 
      ""
    end
  end

  def incoming_mail_alert
    count = Letter.joins(:people).where("seen = ? and letter_people.user_id = ?",false, current_user.id).count

    link_to("#{I18n.t('mail_alert')} (#{count})", user_incoming_letters_path(current_user), class: "letter-alert") if count > 0
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