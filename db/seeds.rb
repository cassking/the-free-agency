# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Player.delete_all
Stat.delete_all
Team.delete_all
User.delete_all

players = ActiveSupport::JSON.decode(File.read('db/seeds/active_players.json'))['activeplayers']['playerentry']
stats = ActiveSupport::JSON.decode(File.read('db/seeds/player_stats.json'))['player_stats']
teams = ActiveSupport::JSON.decode(File.read('db/seeds/teams.json'))

teams.each do |team|
  Team.create!(
    name: team["last_name"],
    city: team["city"],
    state: team["state"],
    logo_url: "http://i.cdn.turner.com/nba/nba/.element/img/1.0/teamsites/logos/teamlogos_500x500/#{team["abbreviation"]}.png",
    win: 0,
    loss: 0,
    ranking: 0
  )
end
unrostered = Team.create!(name: 'Unrostered', city: 'n/a', state: 'n/a', logo_url: 'http://www.stickpng.com/assets/images/58428defa6515b1e0ad75ab4.png', win: 0, loss: 0, ranking: 0)

players.each do |player|
  if player['player']['RosterStatus']=='UFA' && player['player']['Height'] && player['player']['Weight']
    if player['team']
      if player['team']['Name']
        team = Team.find_by(name: player['team']['Name'])
      end
    else
      team = unrostered
    end
    Player.create!(
      first_name: player['player']['FirstName'],
      last_name: player['player']['LastName'],
      position: player['player']['Position'],
      height: player['player']['Height'],
      weight: player['player']['Weight'],
      birth_city: player['player']['BirthCity'],
      birth_country: player['player']['BirthCountry'],
      age: player['player']['Age'],
      avatar_url: player['player']['officialImageSrc'],
      team: team
    )
  end
end

trash_teams = Team.includes(:players).where(players: { id: nil })
trash_teams.each do |trash_team|
  trash_team.delete
end

stats.each do |player|
  if Player.find_by(first_name: player['first_name'], last_name: player['last_name'])
    Stat.create!(
      player: Player.find_by(first_name: player['first_name'], last_name: player['last_name']),
      ppg: player['PPG'],
      apg: player['APG'],
      rpg: player['RPG']
    )
  end
end

u1 = User.create!(username: "u1",email: "u1@gmail.com", password: "pw1234")
u2 = User.create!(username: "u2",email: "u2@gmail.com", password: "pw1234")
u3 = User.create!(username: "u3",email: "u3@gmail.com", password: "pw1234")
admin = User.create!(username: "a1", email: "a1@gmail.com", password: "pw1234", role: "admin")
