require 'rails_helper'

RSpec.describe ConversationsController, :type => :controller do

  describe "GET reply" do
    it "returns http success" do
      get :reply
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET trash" do
    it "returns http success" do
      get :trash
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET untrash" do
    it "returns http success" do
      get :untrash
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET create" do
    it "returns http success" do
      get :create
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET new" do
    it "returns http success" do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET show" do
    it "returns http success" do
      get :show
      expect(response).to have_http_status(:success)
    end
  end

end
