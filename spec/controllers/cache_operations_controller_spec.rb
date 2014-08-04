require 'spec_helper'

describe CacheOperationsController do

  describe "GET 'drop_all'" do
    it "returns http success" do
      get 'drop_all'
      response.should be_success
    end
  end

end
