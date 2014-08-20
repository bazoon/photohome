class Admin::SiteRulesController < ApplicationController

  before_action :set_rule, only: [:edit, :show, :destroy, :update]

  def index
    @site_rules = SiteRule.all
  end

  def new
    @site_rule = SiteRule.new
  end

  def edit
  end

  def show
  end

  def create
    @site_rule = SiteRule.new(site_rule_params)
    
    respond_to do |format|
      if @site_rule.save
        format.html { redirect_to admin_site_rules_path, notice: I18n.t(:saved) }
      else
        format.html { render action: 'new' }
      end
    end
  end

  def update
      respond_to do |format|
      if @site_rule.update(site_rule_params)
        format.html { redirect_to admin_site_rules_path , notice: I18n.t(:saved) }
      else
        format.html { render action: 'edit' }
      end
     end
  end

  def destroy
    @site_rule.destroy
    respond_to do |format|
      format.html { redirect_to admin_site_rules_path }
    end
  end

   private
    # Use callbacks to share common setup or constraints between actions.
    def set_rule
      @site_rule = SiteRule.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def site_rule_params
      params[:site_rule].permit(:locale, :rules, :rules_digest)
    end
end
