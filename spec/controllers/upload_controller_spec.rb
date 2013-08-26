require 'spec_helper'

describe UploadController do

  describe "GET 'get_image'" do
    it "returns http success" do
      get 'get_image'
      response.should be_success
    end
  end

end
