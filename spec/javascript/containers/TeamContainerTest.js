import React from 'react';
import TeamContainer from '../../../app/javascript/containers/TeamContainer';
import TeamTile from '../../../app/javascript/components/TeamTile';

describe('TeamContainer', () => {
  let wrapper;
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

    wrapper = shallow(<TeamContainer />);
  });

  it('should have the specified intial state', () => {
     expect(wrapper.state()).toEqual({
       teams: []
     })
  });

  it('should render an TeamTile Component', () => {
    wrapper.setState({teams: [{
      "key":2,
      "id" :1,
      "name":"team1",
      "logo_url":"google.com"
    }
  ]})
    expect(wrapper.find(TeamTile)).toBePresent();
  });
  it('should not render an TeamTile Component', () => {
    wrapper.setState({teams: []})
    expect(wrapper.find(TeamTile)).not.toBePresent();
  });
});
