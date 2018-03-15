# define team, which has many players.
class Team < ApplicationRecord
  has_many :players
  validates_presence_of :name, :city, :state, :logo_url, :win, :loss, :ranking
end
