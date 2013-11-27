require 'spec_helper'

describe UserCloudController do

  describe "GET 'cloud'" do
    it "returns http success" do
      get 'cloud'
      response.should be_success
    end
  end

end
