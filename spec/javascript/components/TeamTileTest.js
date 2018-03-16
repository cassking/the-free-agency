import React from 'react';
import TeamTile from '../../../app/javascript/components/TeamTile';

describe('TeamTile ', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <TeamTile
        key="3"
        id="3"
        name= "Denver Nuggets"
        logo_url ='http://a.espncdn.com/combiner/i?img=/i/headshots/nba/players/full/3907387.png'
      />
    )
  });

  it('should render an h4 tag', () => {
    expect(wrapper.find('h4')).toBePresent();
  });

  // it('should render an h3 tag', () => {
  //   expect(wrapper.find('h3')).toBePresent();
  // });

  it('should render an img tag', () => {
    expect(wrapper.find('img')).toBePresent();
  });
})
