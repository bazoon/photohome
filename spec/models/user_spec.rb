require 'spec_helper'

describe User do
  


  describe 'dependent records must be destroyed also after parent have been destroyed' do

    let!(:user) { create(:user) }
    let!(:competition_request) { create(:competition_request,user: user)  } 



    it 'destroys competition_requests after user had been destroyed' do
      
      expect(CompetitionRequest.count).to eq(1)
      user.destroy
      expect(CompetitionRequest.count).to eq(0)


    end





  end




end
