class ArticlesController < ApplicationController

  skip_before_filter :authenticate_user!

  def list
    @articles = Article.paginate(:page => params[:page])
  end

  
  def show
    @article = Article.find(params[:id])
  end



end
