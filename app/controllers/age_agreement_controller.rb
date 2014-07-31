class AgeAgreementController < ApplicationController
 skip_before_filter :authenticate_user!
  
  def agreed
  	session[:agreed] = true
  	redirect_to root_path
  end
  
end
