# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  
  factory Admin::AgePolicy do

	  factory :age_policy_0 do
	    age 0
	  end

	  factory :age_policy_6 do
	    age 6
	  end

	  factory :age_policy_12 do
	    age 12
	  end

	  factory :age_policy_16 do
	    age 16
	  end

	  factory :age_policy_18 do
	    age 18
	  end

	end  
end
