# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :post do
    title "MyString"
    content "MyString"
    published false
    user_id 1
    digest "MyString"
  end
end
