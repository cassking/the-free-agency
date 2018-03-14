require 'rails_helper'

RSpec.describe Player, type: :model do
  it { should have_valid(:first_name).when('Johnny') }
  it { should_not have_valid(:first_name).when(nil, '') }

  it { should have_valid(:last_name).when('Smith') }
  it { should_not have_valid(:last_name).when(nil, '') }

  it { should have_valid(:avatar_url).when('https://google.com') }
  it { should_not have_valid(:avatar_url).when(nil, '') }

  it { should have_valid(:age).when('28') }
  it { should_not have_valid(:age).when(nil, '') }

  it { should have_valid(:height).when("6'0") }
  it { should_not have_valid(:height).when(nil, '') }

  it { should have_valid(:weight).when('240') }
  it { should_not have_valid(:weight).when(nil, '') }

  it { should have_valid(:position).when('SF') }
  it { should_not have_valid(:position).when(nil, '') }
end
