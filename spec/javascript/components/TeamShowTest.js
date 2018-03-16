import React from 'react';
import TeamShow from '../../../app/javascript/components/TeamShow';

describe('TeamShow', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <TeamShow
        key="2"
        id="2"
        name ='Houston Rockets'
      />
    )
  });

  it('should render an h2 tag', () => {
    expect(wrapper.find('h2')).toBePresent();
  });
})
