import React from 'react';
import PlayerContainer from '../../../app/javascript/containers/PlayerContainer';
import PlayerTile from '../../../app/javascript/components/PlayerTile';

describe('PlayerContainer', () => {
  let wrapper;
  let player1 = {
    player: [{
      first_name: 'James',
      last_name: 'Harden',
      avatar_url: 'https://specials-images.forbesimg.com/imageserve/5936925ea7ea434078d4c5eb/416x416.jpg?background=000000&cropX1=1335&cropX2=3965&cropY1=104&cropY2=2735'
    }]
  }
  beforeEach(() => {
    spyOn(global, 'fetch').and.callFake(() => {
      let responseBody = JSON.stringify(player1);
      let response = new Response(responseBody, {
        status: '200',
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      });
      return Promise.resolve(response);
    });

    wrapper = mount(<PlayerContainer />);
  });

  it('should have the specified intial state', () => {
     expect(wrapper.state()).toEqual({
       players: []
     })
  });

   it('should render the PlayerTile with different props, when players is not an empty array', (done) => {
   setTimeout(() => {
     expect(wrapper.findWhere(node => node.hasClass('player')))
     expect(wrapper.findWhere(node => node.type() === 'div'))
     done();
   }, 0)
 });
});
