class BannerGenerator 
  
  

  def top
    Admin::BannerPlacement.select_for_top
  end

   def bottom
    
    Admin::BannerPlacement.select_for_bottom

  end



end