require 'rails_helper'

RSpec.describe AboutController, :type => :controller do

  describe "GET us" do
    it "returns http success" do
      get :us
      expect(response).to be_success
    end
  end

  describe "GET rules" do
    it "returns http success" do
      get :rules
      expect(response).to be_success
    end
  end

end
