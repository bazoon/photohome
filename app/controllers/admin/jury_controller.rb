class Admin::JuryController < Admin::BaseController
 before_action :set_jury, only: [:destroy]

def index
  # render text: params.inspect
  @competition = Competition.find(params[:competition_id])
  @jurys = Admin::Jury.where("competition_id = ?", @competition.id)
  @jury = Admin::Jury.new
  # render text: @jurys.inspect
end


def update
  user_ids = params[:admin_jury][:user_tokens]
  competition_id = params[:competition]
  user_ids = user_ids.split(",")

  user_ids.each do |id|   


    is_there = Admin::Jury.where(user_id: id,competition_id: competition_id).count > 0

        
    if (not is_there) && competition_id
      jury = Admin::Jury.new
      jury.user_id = id
      jury.competition_id = competition_id
      jury.save!
    end

  end  


  
  redirect_to :back

end


def destroy
    
  @jury.destroy
  respond_to do |format|
    format.html { redirect_to :back }
    format.json { head :no_content }
  end  


end



private
  # Use callbacks to share common setup or constraints between actions.
  def set_jury
    @jury = Admin::Jury.find(params[:id])
  end


end
