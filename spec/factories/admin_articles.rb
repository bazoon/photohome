# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :admin_article, :class => 'Admin::Article' do
    title "MyString"
    content "MyText"
    digest "MyText"
  end
end
