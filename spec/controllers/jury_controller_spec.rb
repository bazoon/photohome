require 'spec_helper'

describe JuryController do

  describe "GET 'rate'" do
    it "returns http success" do
      get 'rate'
      response.should be_success
    end
  end

end
