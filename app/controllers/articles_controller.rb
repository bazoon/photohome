class ArticlesController < ApplicationController
  

  def list
    @articles = Article.paginate(:page => params[:page])
  end

  
  def show
    @article = Article.find(params[:id])
  end



end
