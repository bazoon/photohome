class AboutController < ApplicationController

	skip_before_filter :authenticate_user!


  #about us
  def us
  end

  def rules
  end
end
