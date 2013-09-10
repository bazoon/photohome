require "spec_helper"

describe Admin::NominationsController do
  describe "routing" do

    it "routes to #index" do
      get("/admin/nominations").should route_to("admin/nominations#index")
    end

    it "routes to #new" do
      get("/admin/nominations/new").should route_to("admin/nominations#new")
    end

    it "routes to #show" do
      get("/admin/nominations/1").should route_to("admin/nominations#show", :id => "1")
    end

    it "routes to #edit" do
      get("/admin/nominations/1/edit").should route_to("admin/nominations#edit", :id => "1")
    end

    it "routes to #create" do
      post("/admin/nominations").should route_to("admin/nominations#create")
    end

    it "routes to #update" do
      put("/admin/nominations/1").should route_to("admin/nominations#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/admin/nominations/1").should route_to("admin/nominations#destroy", :id => "1")
    end

  end
end
