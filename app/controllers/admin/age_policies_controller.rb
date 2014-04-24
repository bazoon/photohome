class Admin::AgePoliciesController < Admin::BaseController
  before_action :set_age_policy, only: [:show, :edit, :update, :destroy]

def index
  @age_policies = Admin::AgePolicy.all
end

def edit
end

def new
  @age_policy = Admin::AgePolicy.new
end

  def create
    @age_policy = Admin::AgePolicy.new(age_policy_params)

    respond_to do |format|
      if @age_policy.save
        format.html { redirect_to admin_age_policies_path, notice: 'Age policiy was successfully created.' }
      else
        format.html { render action: 'new' }
      end
    end
  end


def show


end

def update

    respond_to do |format|

      if @age_policy.update(age_policy_params)
        format.html { redirect_to admin_age_policies_path, notice: 'Age policy was successfully updated' }
      else
        format.html { render action: 'new' }
      end

    end

end  


def destroy
    
  @age_policy.destroy
  respond_to do |format|
    format.html { redirect_to :back }
  end  

end



private
  # Use callbacks to share common setup or constraints between actions.
  def set_age_policy
    @age_policy = Admin::AgePolicy.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def age_policy_params
    params.require(:admin_age_policy).permit(:age)
  end

end
