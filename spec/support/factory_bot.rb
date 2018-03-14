require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    username 'username'
    password 'password'
    password_confirmation 'password'
  end

  factory :player do
    first_name 'Ben'
    last_name 'Simmons'
    avatar_url 'http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3907387.png'
    age '20'
    height "6'10"
    weight '220'
    position 'SF'
  end
end
