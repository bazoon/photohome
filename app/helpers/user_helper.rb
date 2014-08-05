module UserHelper
  

  def incoming_mail_icon
  
  
    count = Letter.joins(:letter_users).where("seen = ? and letter_users.user_id = ?",false, current_user.id).count
    
    if count > 0
      content_tag(:span,count,class: "pull-right label label-warning",style: "margin-left: 15px")
    else 
      ""
    end
  end


  def field_info(user, field, date = false)



    tds = unless date
      content_tag(:td, "#{I18n.t(field)}") + content_tag(:td, user.send(field))
    else
      content_tag(:td, "#{I18n.t(field)}") + content_tag(:td, I18n.l(user.send(field)))
    end

    content_tag(:tr, tds)	 
  end


end