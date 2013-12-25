module LoginRequired
  
  def self.included(base)
    base.before_action :verify_login
  end

  def verify_login
    redirect_to root_path, alert: "Login please !" unless current_user 
  end


end