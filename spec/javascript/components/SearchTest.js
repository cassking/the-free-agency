import React from 'react';
import Search from '../../../app/javascript/components/Search';
import PlayerContainer from '../../../app/javascript/containers/PlayerContainer';

import sinon from 'sinon';

describe('Search input', () => {

  it('should render without throwing and error', () => {
    expect(shallow(<Search />).exists( <input type="text"/>)).toBe(true)
  })
  it('should respond to change event and change the state of the Search Component', () => {
    const wrapper = shallow(<Search />);
    const input = wrapper.find('input');
    const spy = sinon.spy();
    wrapper.simulate('spy');
    expect(change).toHaveBeenCalled();
    console.log(input)
 })

})