class ArticlesController < ApplicationController

  skip_before_filter :authenticate_user!

  def list
    @articles = Article.paginate(:page => params[:page])
   #fresh_when(@articles)
  end

  
  def show
    @article = Article.find(params[:id])
    #fresh_when(@article)
  end



end
