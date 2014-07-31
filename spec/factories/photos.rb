# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
 
 	factory :photo do 

	  factory :accessible_photo do
	    title "MyString"
	    user_id 1
	    image "accessible_photo"
	    association :age_policy, factory: :age_policy_6
	  end

	  factory :restricted_photo do
	    title "MyString"
	    user_id 100
	    image "restricted_photo"
	    association :age_policy, factory: :age_policy_18
	  end

	end  

end
