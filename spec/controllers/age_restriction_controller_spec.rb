require 'spec_helper'

describe AgeRestrictionController do

  describe "GET 'show'" do
    it "returns http success" do
      get 'show'
      response.should be_success
    end
  end

  describe "GET 'agreed'" do
    it "returns http success" do
      get 'agreed'
      response.should be_success
    end
  end

end
