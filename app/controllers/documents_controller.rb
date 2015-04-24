class DocumentsController < ApplicationController
  before_action :ensure_club_membership


  def index
    @documents = Document.all
  end

  def show
    @document = Document.find(params[:id])
  end

  def vote
    @document = Document.find(params[:id])
    @document.vote(current_user)
  end

  def downvote
    @document = Document.find(params[:id])
    @document.downvote(current_user)
  end


  private

  def ensure_club_membership
    redirect_to root_path, alert: "Вход только для членов клуба!" unless current_user && current_user.has_role?(:cluber)
  end

end
