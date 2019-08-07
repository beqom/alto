import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';
import Link from '../../Link';

describe('<Button />', () => {
  it('should render a buttons component', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.type()).toBe('button');
  });

  it('should render a Link conponent if props.href is defined', () => {
    const wrapper = shallow(<Button href="foo" />);
    expect(wrapper.type()).toBe(Link);
  });

  it('should render a custom conponent if props.tag is defined', () => {
    const wrapper = shallow(<Button tag="div" />);
    expect(wrapper.type()).toBe('div');
  });

  it('should support severals modifiers', () => {
    [
      'outline',
      'flat',
      'danger',
      'success',
      'white',
      'medium',
      'small',
      'active',
      'block',
      'nowrap',
    ].forEach(modifier => {
      const wrapper = shallow(<Button {...{ [modifier]: true }} />);
      expect(wrapper.prop('className')).toBe(`button button--${modifier}`);
    });
  });

  it('should add prop.className', () => {
    const wrapper = shallow(<Button className="my-classname" />);
    expect(wrapper.prop('className')).toBe('button my-classname');
  });

  it('should foward any other props', () => {
    const wrapper = shallow(<Button title="Hello" />);
    expect(wrapper.prop('title')).toBe('Hello');
  });
});
