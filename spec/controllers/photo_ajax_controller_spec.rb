require 'spec_helper'

describe PhotoAjaxController do

  describe "GET 'theme_tokens'" do
    it "returns http success" do
      get 'theme_tokens'
      response.should be_success
    end
  end

end
