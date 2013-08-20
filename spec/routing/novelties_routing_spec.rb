require "spec_helper"

describe NoveltiesController do
  describe "routing" do

    it "routes to #index" do
      get("/novelties").should route_to("novelties#index")
    end

    it "routes to #new" do
      get("/novelties/new").should route_to("novelties#new")
    end

    it "routes to #show" do
      get("/novelties/1").should route_to("novelties#show", :id => "1")
    end

    it "routes to #edit" do
      get("/novelties/1/edit").should route_to("novelties#edit", :id => "1")
    end

    it "routes to #create" do
      post("/novelties").should route_to("novelties#create")
    end

    it "routes to #update" do
      put("/novelties/1").should route_to("novelties#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/novelties/1").should route_to("novelties#destroy", :id => "1")
    end

  end
end
