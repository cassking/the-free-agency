import PlayerShowContainer from '../../../app/javascript/containers/PlayerShowContainer';
import PlayerShow from '../../../app/javascript/components/PlayerShow';
import StatsTile from '../../../app/javascript/components/StatsTile';
import CommentForm from '../../../app/javascript/components/CommentForm';

describe('PlayerShowContainer', () => {
  let wrapper;
  let player1 = {
    player: [{
      first_name: 'James',
      last_name: 'Harden',
      avatar_url: 'https://specials-images.forbesimg.com/imageserve/5936925ea7ea434078d4c5eb/416x416.jpg?background=000000&cropX1=1335&cropX2=3965&cropY1=104&cropY2=2735'
    }]
  }
  let comment1 = []
  let stat1 = {ppg: '30', rpg: '5', apg: '9.4'}

  beforeEach(() => {
    spyOn(global, 'fetch').and.callFake(() => {
      let responseBody = JSON.stringify({player1, comment1, stat1});
      let response = new Response(responseBody, {
        status: '200',
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      });
      return Promise.resolve(response);
    });
    wrapper = shallow(<PlayerShowContainer />);
  });
  it('should have the specified intial state', () => {
     expect(wrapper.state()).toEqual({
       player: {},
       comments: [],
       comment: '',
       stat: {},
       errors: {},
       signed_in: false
     })
  });
  it('should render an PlayerShow Component', () => {
    expect(wrapper.find(PlayerShow)).toBePresent();
  });
  it('should render a Stats Component', () => {
    expect(wrapper.find(StatsTile)).toBePresent();
  });
  it('should render a CommentForm Component', () => {
    wrapper.setState({signed_in: true})
    expect(wrapper.find(CommentForm)).toBePresent();
  });
});
