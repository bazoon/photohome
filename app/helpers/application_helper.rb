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


  def can_view?
    not current_user.nil?
  end

  def is_stuff?
    current_user && current_user.is_stuff?
  end

  def ld(d)
    I18n.l(d, format: :long) unless d.nil?
  end  


  def show_icon
    content_tag(:span,"",class: "glyphicon glyphicon-folder-open")
  end

  def exclaim_icon
    content_tag(:span,"",class: "glyphicon glyphicon-exclamation-sign")
  end

  def eye_open_icon(id)
    content_tag(:span,"",class: "glyphicon glyphicon-eye-open",id: id)
  end  

   def eye_close_icon(id)
    content_tag(:span,"",class: "glyphicon glyphicon-eye-close",id: id)
  end  

  def edit_icon
    content_tag(:span,"",class: "glyphicon glyphicon-edit")
  end

  def del_icon
    content_tag(:span,"",class: "glyphicon glyphicon-trash")
  end

  def arrow_up_icon
    content_tag(:span,"",class: "glyphicon glyphicon-arrow-up")
  end


  def red_label(s)
    content_tag(:span,s,class: "label label-danger")
  end

  def green_label(s)
    content_tag(:span,s,class: "label label-success")
  end

  def jury_icon
    content_tag(:span,"",class: "glyphicon glyphicon-tower")
  end


  def nomination_icon
    content_tag(:span,"",class: "glyphicon glyphicon-book")
  end  

  def request_icon
    content_tag(:span,"",class: "glyphicon glyphicon-envelope")
  end

  def photo_icon
    content_tag(:span,"",class: "glyphicon glyphicon-camera")
  end

  def list_icon
    content_tag(:span,"",class: "glyphicon glyphicon-list-alt")
  end

  def like_icon(id)
    content_tag(:span,"",class: "glyphicon glyphicon-thumbs-up",id: id)
  end

  def unlike_icon(id)
    content_tag(:span,"",class: "glyphicon glyphicon-thumbs-down",id: id)
  end

  def plus_icon
    content_tag(:span,"",class: "glyphicon glyphicon-plus")
  end

  def promote_icon(id, promoted)
    content_tag(:span, "", class: promoted ? "promoted glyphicon glyphicon-pushpin" : "glyphicon glyphicon-pushpin", id: id)
  end

  def approve_icon(approved, id)
    content_tag(:span,"",class:  approved ? "glyphicon glyphicon-thumbs-up" : "glyphicon glyphicon-thumbs-down",style: "font-size: 20px", id: id)
  end

  

  def comment_icon
    content_tag(:span,"",class: "glyphicon glyphicon-comment")
  end
  

  def ru_icon
    # image_tag(asset_path("ru.png"))
    "EN"
  end

  def en_icon
    # image_tag(asset_path("gb.png"))
    
    "RU"
  end

  def age_badge(age)
    labels = {0 => "default", 6 => "success", 12 => "info", 16 => "warning", 18 => "danger" }
    content_tag(:span, age.to_s + " +", class: "label label-#{labels[age]}", style: "font-size: 10px" )
  end

  def age_badge_faded(age)
    content_tag(:span, age.to_s + " +", class: "label label-default", style: "font-size: 10px" )
  end

  def age_badge_selected(age)
    content_tag(:span, age.to_s + " +", class: "label label-success", style: "font-size: 10px" )
  end

  def users_icon
    content_tag(:span,"",class: "glyphicon glyphicon-user")
  end



  def jury_rate(user_id, competition_photo_id, value, klass)
    content_tag(:input,nil,type: "number", class: "rating #{klass}", min: 0, max: 10,
                step: 0.5, "data-size" => "sm".html_safe, 
                data: "#{user_id}:#{competition_photo_id}.html_safe",value: value.to_s.html_safe)
  end


  def final_estimate(place, competition_photo_id, klass)
    content_tag(:input,nil,type: "number", class: "rating #{klass}", min: 0, max: 3,
                step: 1, "data-size" => "md".html_safe, "data-stars" => 3, 
                data: competition_photo_id.to_s.html_safe,value: place.to_s.html_safe)
  end

  def elki(text)
    "&laquo;".html_safe+text+"&raquo;".html_safe if text 
  end

  def edit_link_to(title, s)
    
  end

  def title(page_title)
    content_for :title, page_title.to_s + " " + request.original_url + " " + I18n.t(:title)
  end


end
