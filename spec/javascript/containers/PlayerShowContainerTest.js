import PlayerShowContainer from '../../../app/javascript/containers/PlayerShowContainer';
import PlayerShow from '../../../app/javascript/components/PlayerShow';
import StatsTile from '../../../app/javascript/components/StatsTile';
import CommentFormContainer from '../../../app/javascript/containers/CommentFormContainer';
import CommentTile from '../../../app/javascript/components/CommentTile';


describe('PlayerShowContainer', () => {
  let wrapper;
  let player1 = {
    player: [{
      first_name: 'James',
      last_name: 'Harden',
      avatar_url: 'https://specials-images.forbesimg.com/imageserve/5936925ea7ea434078d4c5eb/416x416.jpg?background=000000&cropX1=1335&cropX2=3965&cropY1=104&cropY2=2735'
    }]
  }
  let stat1 = {ppg: '30', rpg: '5', apg: '9.4'}
  let comments = [{body: 'hi', id: '1', key: '1', username: 'name'}]
  let signed_in = {signed_in: false}
  beforeEach(() => {
    spyOn(global, 'fetch').and.callFake(() => {
      let responseBody = JSON.stringify({player1, comments, stat1, signed_in});
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
       stat: {},
       signed_in: false,
       team_name: "",
       team_id: 0
     })
  });

  it('should render an PlayerShow Component', () => {
    expect(wrapper.find(PlayerShow)).toBePresent();
  });

  it('should render a Stats Component', () => {
    expect(wrapper.find(StatsTile)).toBePresent();
  });
  it('should render a CommentFormContainer Component', () => {
    wrapper.setState({signed_in: true})
    expect(wrapper.find(CommentFormContainer)).toBePresent();
  });
  it('should render a CommentTile Component', () => {
    wrapper.setState({comments: [[{body: 'hi', id: '1', key: '1', username: 'name'}]]})
    expect(wrapper.find(CommentTile)).toBePresent();
  });
});
