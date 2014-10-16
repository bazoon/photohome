module CompetitionPhotoHelper


  def ban_helper(competition_photo)
    content_tag(:span, "banned",class: "label label-danger") if competition_photo.banned
  end

end
