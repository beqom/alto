import React from 'react';
import { shallow } from 'enzyme';

import Button from '../Button';
import Link from '../../Link';

describe('<Button />', () => {
  it('should render a button component', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.type()).toBe('button');
  });

  it('should render a Link conponent if props.href is defined', () => {
    const wrapper = shallow(<Button href="foo" />);
    expect(wrapper.type()).toBe(Link);
  });

  it('should support severals modifiers', () => {
    [
      'outline',
      'flat',
      'danger',
      'success',
      'white',
      'large',
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
