# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :admin_banner_placement, :class => 'Admin::BannerPlacement' do
    banner_id 1
    place_id 1
    start_date "2013-12-09"
    end_date "2013-12-09"
  end
end
