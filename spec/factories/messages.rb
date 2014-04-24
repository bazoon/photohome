# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :message do
    title "MyString"
    content "MyString"
    user_id 1
    status 1
    message_reason_id 1
  end
end
