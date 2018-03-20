import React from 'react';
import CommentForm from '../../../app/javascript/components/CommentForm';

describe('CommentForm', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <CommentForm
        comment="hello"
      />
    )
  });

  it('should render a form tag', () => {
    expect(wrapper.find('form')).toBePresent();
  });
  it('should render an input tag', () => {
    expect(wrapper.find('input')).toBePresent();
  });
})
