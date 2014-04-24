class BannerGenerator 
  
  

  def top
    banner = Admin::BannerPlacement.select_for_top
    banner
  end

  def bottom

    banner = Admin::BannerPlacement.select_for_bottom
    banner

  end



end