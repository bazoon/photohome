# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :admin_banner, :class => 'Admin::Banner' do
    image "MyString"
    link "MyString"
  end
end
