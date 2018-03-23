import PlayerContainer from '../../../app/javascript/containers/PlayerContainer';
import PlayerTile from '../../../app/javascript/components/PlayerTile';
import Search from '../../../app/javascript/components/Search';

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
    wrapper = shallow(<PlayerContainer />);
  });

  it('should have the specified intial state', () => {
     expect(wrapper.state()).toEqual({
       searchedPlayers: [],
       allPlayers: [],
       currentPage: 1,
       playersPerPage: 4
     })
  });

  it('should render an PlayerTile Component', () => {
    wrapper.setState({searchedPlayers: [{"id":3,"first_name":"James","last_name":"Harden","avatar_url":"https://specials-images.forbesimg.com/imageserve/5936925ea7ea434078d4c5eb/416x416.jpg?background=000000\u0026cropX1=1335\u0026cropX2=3965\u0026cropY1=104\u0026cropY2=2735","age":"28","height":"6'5","weight":"220","birth_city":"Los Angeles, CA","birth_country":"USA","position":"SG","twitter":null,"team_id":1,"created_at":"2018-03-16T13:44:14.516Z","updated_at":"2018-03-16T13:44:14.516Z"}
  ]})
    expect(wrapper.find(PlayerTile)).toBePresent();
  });
  it('should not render an PlayerTile Component', () => {
    wrapper.setState({searchedPlayers: []})
    expect(wrapper.find(PlayerTile)).not.toBePresent();
  });
});
