require 'spec_helper'

describe LikeController do

  describe "GET 'like'" do
    it "returns http success" do
      get 'like'
      response.should be_success
    end
  end

end
