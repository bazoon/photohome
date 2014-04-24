module UserHelper
  

  def incoming_mail_icon
  
  
    count = Letter.joins(:letter_users).where("seen = ? and letter_users.user_id = ?",false, current_user.id).count
    
    if count > 0
      content_tag(:span,count,class: "pull-right label label-warning",style: "margin-left: 15px")
    else 
      ""
    end
  end


end