import React from 'react';
import { shallow } from 'enzyme';

import Tag from './../Tag';

describe('Tag', () => {
  const defaultProps = {
    className: 'className',
    active: true,
    rounded: true,
    propMock: true,
    onClick: jest.fn(),
    disabled: true,
  };

  const getWrapper = props => shallow(<Tag {...props} />);

  it('should render without error', () => {
    const wrapper = getWrapper({});

    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('div').hasClass('Tag')).toBe(true);
  });

  it('should render button if passed onClick prop', () => {
    const wrapper = getWrapper(defaultProps);

    expect(wrapper.find('button')).toHaveLength(1);
  });

  it('should set correct class names', () => {
    const button = getWrapper(defaultProps).find('button');

    expect(button.hasClass('className')).toBe(true);
    expect(button.hasClass('Tag--active')).toBe(true);
    expect(button.hasClass('Tag--button')).toBe(true);
    expect(button.hasClass('Tag--disabled')).toBe(true);
    expect(button.hasClass('Tag--rounded')).toBe(true);
  });
});
