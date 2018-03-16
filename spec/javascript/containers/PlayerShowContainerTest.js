import PlayerShowContainer from '../../../app/javascript/containers/PlayerShowContainer';
import PlayerShow from '../../../app/javascript/components/PlayerShow';

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

  beforeEach(() => {
    spyOn(global, 'fetch').and.callFake(() => {
      let responseBody = JSON.stringify({player1, comment1});
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
       player: {}
     })
  });
  it('should render an PlayerShow Component', () => {
    wrapper.setState({player: {id: 3, first_name: "James", last_name: "Harden", avatar_url: "https://specials-images.forbesimg.com/imageserve/5936925ea7ea434078d4c5eb/416x416.jpg?background=000000\u0026cropX1=1335\u0026cropX2=3965\u0026cropY1=104\u0026cropY2=2735"}
  })
    expect(wrapper.find(PlayerShow)).toBePresent();
  });
});
