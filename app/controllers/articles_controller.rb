class ArticlesController < ApplicationController


  def list
    @articles = Admin::Article.paginate(:page => params[:page])
  end

  
  def show
    @article = Admin::Article.find(params[:id])
  end



end
