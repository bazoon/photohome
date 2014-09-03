class Admin::StatsController < ApplicationController

  def index
    @stats = Stats.new
    
  end

  def show
  end
end
