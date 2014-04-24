# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :gallery do
    photo_id 1
    image "MyString"
    album_id 1
  end
end
