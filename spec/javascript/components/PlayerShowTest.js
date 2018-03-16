import React from 'react';
import PlayerShow from '../../../app/javascript/components/PlayerShow';

describe('PlayerShow', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <PlayerShow
        last_name="James"
        first_name="LeBron"
        avatar_url ='http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3907387.png'
      />
    )
  });

  it('should render an h2 tag', () => {
    expect(wrapper.find('h2')).toBePresent();
  });
  it('should render an img tag', () => {
    expect(wrapper.find('img')).toBePresent();
  });
})
