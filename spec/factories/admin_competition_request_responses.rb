# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :admin_competition_request_response, :class => 'Admin::CompetitionRequestResponse' do
    request_id 1
    response_id 1
  end
end
