require 'rails_helper'

RSpec.describe Api::V1::PlayersController, type: :controller do
  let!(:team1) {
    Team.create!(
      name: 'team1',
      city: 'that place',
      state: 'that state',
      logo_url: 'https://i0.wp.com/boxclue.co/wp-content/uploads/2018/01/Kodak-Black-driving-car-meme.png?fit=500%2C566&ssl=1',
      win: '100',
      loss: '0',
      ranking: '1'
    )
  }
  let!(:james_harden) {
    Player.create!(
      first_name: 'James',
      last_name: 'Harden',
      avatar_url: 'https://specials-images.forbesimg.com/imageserve/5936925ea7ea434078d4c5eb/416x416.jpg?background=000000&cropX1=1335&cropX2=3965&cropY1=104&cropY2=2735',
      age: '28',
      height: "6'5",
      weight: '220',
      birth_city: 'Los Angeles, CA',
      birth_country: 'USA',
      position: 'SG',
      team_id: team1.id
    )
  }
  let!(:kevin_durant) {
    Player.create!(
      first_name: 'Kevin',
      last_name: 'Durant',
      avatar_url: 'http://tsnimages.tsn.ca/ImageProvider/PlayerHeadshot?seoId=kevin-durant&width=620&height=620',
      age: '29',
      height: "6'9",
      weight: '240',
      birth_city: 'Washington, D.C.',
      birth_country: 'USA',
      position: 'SF',
      team_id: team1.id
    )
  }
  let!(:user1) {
    User.create(
      email: 'pieday@yahoo.com',
      username: 'ilovepie',
      password: 'password'
    )
  }
  let!(:comment1) {
    Comment.create(
      user_id: user1.id,
      player_id: kevin_durant.id,
      body: 'This is a comment on Kevin Durant.'
    )
  }
  describe 'GET#index' do
    it 'should return a list of all the players' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json.length).to eq 2
      expect(returned_json[0]['first_name']).to eq 'James'
      expect(returned_json[0]['last_name']).to eq 'Harden'

      expect(returned_json[1]['height']).to eq "6'9"
      expect(returned_json[1]['weight']).to eq '240'
    end
  end
  describe 'GET#show' do
    it 'user visit player show page should the player information' do
      get :show, params: { id: kevin_durant.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['player']['first_name']).to eq 'Kevin'
      expect(returned_json['player']['position']).to eq 'SF'
    end
    it 'user visit player show page should return a list of all the comments' do
      get :show, params: { id: kevin_durant.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['comments'].length).to eq 1
      expect(returned_json['comments'][0][0]['body']).to eq 'This is a comment on Kevin Durant.'
    end
  end
end
