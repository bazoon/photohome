# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :admin_subscription_log, :class => 'Admin::SubscriptionLog' do
    resource "MyString"
    id 1
    sent "2014-09-04"
    user_id 1
  end
end
