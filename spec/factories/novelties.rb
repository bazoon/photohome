# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :novelty do
    title "MyString"
    content "MyText"
    publish_date "2013-08-20"
    published false
    user_id 1
  end
end
