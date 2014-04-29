require 'spec_helper'

describe SitePhotoController do

  describe "GET 'show'" do
    it "returns http success" do
      get 'show'
      response.should be_success
    end
  end

  describe "GET 'show_with_others'" do
    it "returns http success" do
      get 'show_with_others'
      response.should be_success
    end
  end

end
