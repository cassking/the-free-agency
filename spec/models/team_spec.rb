require 'rails_helper'

RSpec.describe Team, type: :model do
  it { should have_valid(:name).when('76ers') }
  it { should_not have_valid(:name).when(nil, '') }

  it { should have_valid(:city).when('Philadelphia') }
  it { should_not have_valid(:city).when(nil, '') }

  it { should have_valid(:state).when('Pennsylvania') }
  it { should_not have_valid(:state).when(nil, '') }

  it { should have_valid(:logo_url).when('http://google.com') }
  it { should_not have_valid(:logo_url).when(nil, '') }

  it { should have_valid(:win).when('2') }
  it { should_not have_valid(:win).when(nil, '') }

  it { should have_valid(:loss).when('0') }
  it { should_not have_valid(:loss).when(nil, '') }

  it { should have_valid(:ranking).when('1') }
  it { should_not have_valid(:ranking).when(nil, '') }
end
