# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :competition do
    title "MyString"
    description "MyText"
    last_date 3.days.from_now
    open_date 5.days.from_now
    accept_date Time.zone.now
    status_id 0
    type_id 0 
    
    slug "slug"
    num_stars 10
    


  end
end
