class AboutController < ApplicationController

	skip_before_filter :authenticate_user!

  def us
  end

  def rules
  end
end
