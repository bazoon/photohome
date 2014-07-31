# # Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :letter do
    title "MyString"
    content "MyText"
    user_id 1
  end
end
