class Admin::DocumentsController < Admin::BaseController
  before_action :set_document, only: [:show, :edit, :update, :destroy]

  def index
    @documents = Document.all
  end

  def show
  end

  def spam
    @document = Document.find(params[:document_id])
    User.with_role('cluber').each do |user|
      # VotingWorker.perform_async(user.id, @document.id)   
      UserMailer.delay_for(2.seconds).voting_email(user, @document)
    end
  end

  def new
    @document = Document.new
  end

  def edit
  end

  def create
    @document = Document.new(document_params)
    respond_to do |format|
      if @document.save
        format.html { redirect_to admin_documents_path,
          notice: 'Topic was successfully created.' }
      else
        format.html { render action: 'new' }
      end
    end
  end

  
  def update
    respond_to do |format|
      if @document.update(document_params)
        format.html { redirect_to admin_documents_path, notice: 'Topic was successfully updated.' }
      else
        format.html { render action: 'edit' }
      end
    end
  end
 
  def destroy
    @document.destroy
    respond_to do |format|
      format.html { redirect_to admin_documents_path }
      format.json { head :no_content }
    end
  end

  def accept
    @document = Document.find(params[:id])
    @document.accept
  end

  def reject
    @document = Document.find(params[:id])
    @document.reject
  end


  private
 
    def set_document
      @document = Document.find(params[:id])
    end

    
    def document_params
      params.require(:document).permit(:title, :content, :status, :creation_date)
    end
end
