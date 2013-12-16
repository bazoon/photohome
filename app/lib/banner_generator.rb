class BannerGenerator 
  
  

  def top
    banner = Admin::BannerPlacement.select_for_top
    banner && banner.image_url
  end

  def bottom

    banner = Admin::BannerPlacement.select_for_bottom
    banner && banner.image_url

  end



end