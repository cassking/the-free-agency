# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.delete_all

u1 = User.create!(username: "u1",email: "u1@gmail.com", password: "pw1234")
u2 = User.create!(username: "u2",email: "u2@gmail.com", password: "pw1234")
u3 = User.create!(username: "u3",email: "u3@gmail.com", password: "pw1234")
admin = User.create!(username: "a1", email: "a1@gmail.com", password: "pw1234", role: "admin")
