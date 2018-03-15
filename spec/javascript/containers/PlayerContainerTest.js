import React from 'react';
import PlayerContainer from '../../../app/javascript/containers/PlayerContainer';
import PlayerTile from '../../../app/javascript/components/PlayerTile';
import { mount } from 'enzyme'
import jasmineEnzyme from 'jasmine-enzyme';


describe('PlayerContainer', () => {
  let wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <PlayerContainer />
    );
  });
  it('should render an PlayerTile Component', () => {
    expect(wrapper.find(PlayerTile)).toBePresent();
  });
  it('should render the PlayerTile Component with specific props when PlayerTile is present', () => {
    expect(wrapper.find(PlayerTile).props()).toEqual({
      avatar_url: 'https://specials-images.forbesimg.com/imageserve/5936925ea7ea434078d4c5eb/416x416.jpg?background=000000&cropX1=1335&cropX2=3965&cropY1=104&cropY2=2735',
      first_name: 'James',
      last_name: 'Harden'
    });
  });


});
