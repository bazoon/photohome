require 'spec_helper'

describe Ability do
  
  let(:user) do 
    user = FactoryGirl.build(:user)
    user.skip_confirmation!
    user.save!
    user.stub(:age) { 15 }
    user
  end

	let(:photo) do
    photo = FactoryGirl.build(:photo)
  end 



  it "Young user can not see restricted_photo" do
    ability = Ability.new(user)
    user.stub(:age) { 15 }
    photo.stub(:age_policy_age) { 18 }
    ability.can?(:view, photo).should == false
  end


  it "Old user can see restricted_photo" do
    ability = Ability.new(user)
    user.stub(:age) { 25 }
    photo.stub(:age_policy_age) { 18 }
    ability.can?(:view, photo).should == true
  end

end