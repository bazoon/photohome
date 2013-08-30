module Admin::MessagesHelper




  def status_class(message)
    
    if message.status_id == 0
      return "label label-warning"
    elsif message.status_id == 1
      return "label label-success"
    else
      return "label label-default"
    end  
      

  end



end
