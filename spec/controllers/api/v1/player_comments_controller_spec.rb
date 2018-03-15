require 'rails_helper'

RSpec.describe Api::V1::PlayersController, type: :controller do
  let!(:player1) { Player.create(
    first_name: 'Kevin',
    last_name: 'Durant',
    avatar_url: 'http://tsnimages.tsn.ca/ImageProvider/PlayerHeadshot?seoId=kevin-durant&width=620&height=620',
    age: '29',
    height: "6'9",
    weight: '240',
    birth_city: 'Washington, D.C.',
    birth_country: 'USA',
    position: 'SF'
    )
  }
  let!(:user1) { User.create(
    email: 'pieday@yahoo.com',
    username: 'ilovepie',
    password: 'password'
    )
  }
  let!(:comment1) { Comment.create(
    user_id: user1.id,
    player_id: player1.id,
    body: 'This is a comment on Kevin Durant.'
    )
  }

  describe "GET#show" do
    it 'user visit player show page should return a list of all the comments' do
      get :show, params: { id: player1.id }
      returned_json = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')
      expect(returned_json["comments"].length).to eq 1
      expect(returned_json["comments"][0]['body']).to eq 'This is a comment on Kevin Durant.'
    end
  end
end


