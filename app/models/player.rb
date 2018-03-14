# Defines the player modules. Others available are:
# :birth_city, :birth_country, :team_id
class Player < ApplicationRecord
  has_many :stats
  has_many :comments
  has_many :users, through: :comments

  validates_presence_of :first_name, :last_name, :avatar_url
  validates_presence_of :age, :height, :weight, :position
end