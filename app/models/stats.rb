# define player stat, which belongs to the player. one to one relationship
class Stat < ApplicationRecord
  belongs_to :player
  validates_presence_of :ppg, :apg, :rpg, :player_id
end