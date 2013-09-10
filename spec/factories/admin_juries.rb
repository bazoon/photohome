# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :admin_jury, :class => 'Admin::Jury' do
    competition_id 1
    user_id 1
  end
end
