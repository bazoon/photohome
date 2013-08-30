module ApplicationHelper

  def display_base_errors resource
    return '' if (resource.errors.empty?) or (resource.errors[:base].empty?)
    messages = resource.errors[:base].map { |msg| content_tag(:p, msg) }.join
    html = <<-HTML
    <div class="alert alert-error alert-block">
      <button type="button" class="close" data-dismiss="alert">&#215;</button>
      #{messages}
    </div>
    HTML
    html.html_safe
  end


  def show_icon
    content_tag(:span,"",class: "ui-icon ui-icon-folder-open")
  end


  def eye_open_icon(id)
    content_tag(:span,"",class: "glyphicon glyphicon-eye-open",id: id)
  end  

   def eye_close_icon(id)
    content_tag(:span,"",class: "glyphicon glyphicon-eye-close",id: id)
  end  


  def edit_icon
    content_tag(:span,"",class: "ui-icon ui-icon-pencil")
  end


  def del_icon
    content_tag(:span,"",class: "ui-icon ui-icon-minus")
  end

end
