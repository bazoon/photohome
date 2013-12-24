require 'spec_helper'

describe Admin::CompetitionRequestController do

  describe "GET 'approve'" do
    it "returns http success" do
      get 'approve'
      response.should be_success
    end
  end

  describe "GET 'response'" do
    it "returns http success" do
      get 'response'
      response.should be_success
    end
  end

  describe "GET 'destroy'" do
    it "returns http success" do
      get 'destroy'
      response.should be_success
    end
  end

end
