require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    username 'username'
    password 'password'
    password_confirmation 'password'
  end

end
