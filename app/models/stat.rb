class Stat < ApplicationRecord
  belongs_to :player
  validates_presence_of :ppg, :apg, :rpg, :player_id
end
