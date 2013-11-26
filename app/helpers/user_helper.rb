module UserHelper
  

  def incoming_mail_icon
    
    count = Letter.joins(:letter_users).where("seen = false and letter_users.user_id = ?",[current_user.id]).count
    if count > 0
      content_tag(:span,count,class: "glyphicon glyphicon-envelope",style: "padding-left: 3px;")
    else
      ""
    end
  end


end