# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Player.delete_all
Stat.delete_all
User.delete_all
Comment.delete_all
Team.delete_all

team1 = Team.create!(
      name: 'team1',
      city: 'that place',
      state: 'that state',
      logo_url: 'https://i0.wp.com/boxclue.co/wp-content/uploads/2018/01/Kodak-Black-driving-car-meme.png?fit=500%2C566&ssl=1',
      win: '100',
      loss: '0',
      ranking: '1'
    )

james_harden = Player.create!(
  first_name: "James",
  last_name: "Harden",
  avatar_url: "https://specials-images.forbesimg.com/imageserve/5936925ea7ea434078d4c5eb/416x416.jpg?background=000000&cropX1=1335&cropX2=3965&cropY1=104&cropY2=2735",
  age: "28",
  height: "6'5",
  weight: "220",
  birth_city: "Los Angeles, CA",
  birth_country: "USA",
  position: "SG",
  team: team1
)

Stat.create!(
  player_id: james_harden.id,
  ppg: "30",
  apg: "9.4",
  rpg: "5"
)

kevin_durant = Player.create!(
  first_name: "Kevin",
  last_name: "Durant",
  avatar_url: "http://tsnimages.tsn.ca/ImageProvider/PlayerHeadshot?seoId=kevin-durant&width=620&height=620",
  age: "29",
  height: "6'9",
  weight: "240",
  birth_city: "Washington, D.C.",
  birth_country: "USA",
  position: "SF",
  team: team1
)

Stat.create!(
  player_id: kevin_durant.id,
  ppg: "30",
  apg: "9.4",
  rpg: "5"
)

u1 = User.create!(username: "u1",email: "u1@gmail.com", password: "pw1234")
u2 = User.create!(username: "u2",email: "u2@gmail.com", password: "pw1234")
u3 = User.create!(username: "u3",email: "u3@gmail.com", password: "pw1234")
admin = User.create!(username: "a1", email: "a1@gmail.com", password: "pw1234", role: "admin")
