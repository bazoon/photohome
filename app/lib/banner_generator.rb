class BannerGenerator 
  
  

  def top
    
    Admin::BannerPlacement.active.top.map { |bp| bp.banner  }


  end


end