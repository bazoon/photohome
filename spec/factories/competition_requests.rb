# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :competition_request do
    competition_id 1
    user_id 1
    approved false
  end
end
