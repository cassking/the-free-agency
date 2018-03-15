require 'rails_helper'

RSpec.describe Api::V1::TeamsController, type: :controller do
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
  describe 'GET#index' do
    it 'should return a list of all the teams' do
      get :index
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json.length).to eq 1
      expect(returned_json[0]['name']).to eq 'team1'
      expect(returned_json[0]['ranking']).to eq '1'
    end
  end
  describe 'GET#show' do
    it 'user visit team show page should list the players' do
      get :show, params: { id: team1.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['players'][0]['first_name']).to eq 'James'
      expect(returned_json['team']['name']).to eq 'team1'
    end
  end
end
