# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do

  factory :user do |u|
    name 'vit'
    # email 'example@example.com'
    u.sequence(:email) { |n| "example#{n*2}@example.com"}
    password 'changeme'
    password_confirmation 'changeme'
    # required if the Devise Confirmable module is used
    confirmed_at Time.zone.now




  end





end
