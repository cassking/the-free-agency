import React from 'react';
import PlayerTile from '../../../app/javascript/components/PlayerTile';

describe('PlayerTile ', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <PlayerTile
        last_name="James"
        first_name="LeBron"
        avatar_url ='http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3907387.png'
      />
    )
  });

  it('should render an h4 tag', () => {
    expect(wrapper.find('h4')).toBePresent();
  });
  it('should render an img tag', () => {
    expect(wrapper.find('img')).toBePresent();
  });
})
