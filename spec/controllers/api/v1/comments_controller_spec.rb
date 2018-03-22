require 'rails_helper'

RSpec.describe Api::V1::CommentsController, type: :controller do
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
  let!(:user1) {
    User.create!(
      email: 'pieday@yahoo.com',
      username: 'ilovepie',
      password: 'password'
    )
  }

  describe 'POST#create' do
    it 'should return a new comment' do
      sign_in user1
      post :create, params: {
        comment: { body: 'hi' }, player_id: james_harden.id
      }

      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json['comments'][0][0]['body']).to eq 'hi'
    end
  end
end
