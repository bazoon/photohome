class VotingWorker
include Sidekiq::Worker


  def perform(user_id, document_id)
    user = User.find(user_id)
    document = Document.find(document_id)
    UserMailer.voting_email(user, document).deliver
  end

end
