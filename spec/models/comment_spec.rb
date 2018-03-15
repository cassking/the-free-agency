require 'rails_helper'
RSpec.describe Comment, type: :model do
  it { should belong_to :user }
  it { should belong_to :player }

  it { should have_valid(:body).when('a comment') }
  it { should_not have_valid(:body).when(nil, '') }

  it { should have_valid(:user).when(User.new) }
  it { should_not have_valid(:user).when(nil) }

  it { should have_valid(:player).when(Player.new) }
  it { should_not have_valid(:player).when(nil) }
end
