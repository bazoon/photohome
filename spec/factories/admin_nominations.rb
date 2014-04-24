# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :admin_nomination, :class => 'Admin::Nomination' do
    title "MyString"
    description "MyText"
  end
end
