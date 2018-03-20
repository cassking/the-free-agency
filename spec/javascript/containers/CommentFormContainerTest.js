import CommentFormContainer from '../../../app/javascript/containers/CommentFormContainer';
import CommentForm from '../../../app/javascript/components/CommentForm';


describe('CommentFormContainer', () => {
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
  beforeEach(() => {
    spyOn(global, 'fetch').and.callFake(() => {
      let responseBody = JSON.stringify({player1, comments, stat1});
      let response = new Response(responseBody, {
        status: '200',
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' }
      });
      return Promise.resolve(response);
    });
    wrapper = shallow(<CommentFormContainer />);
  });

  it('should have the specified intial state', () => {
     expect(wrapper.state()).toEqual({
       comment: '',
       errors: {}
     })
  });

  it('should render a CommentForm Component', () => {
    wrapper.setProps({signed_in: true})
    expect(wrapper.find(CommentForm)).toBePresent();
  });
});
