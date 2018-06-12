import React from 'react';
import { shallow } from 'enzyme';

import Avatar from '../Avatar';
import UserIcon from '../../Icons/User';
import Image from '../../Image';

describe('<Avatar />', () => {
  const props = { src: '/img', alt: 'my img' };
  it('should render a button component', () => {
    const wrapper = shallow(<Avatar {...props} />);
    expect(wrapper.type()).toBe('div');
  });

  it('should support severals modifiers', () => {
    ['big', 'large', 'small'].forEach(modifier => {
      const wrapper = shallow(<Avatar {...props} {...{ [modifier]: true }} />);
      expect(wrapper.prop('className')).toBe(`Avatar Avatar--${modifier}`);
    });
  });

  it('should support className props', () => {
    const wrapper = shallow(<Avatar {...props} className="My__classname" />);
    expect(wrapper.prop('className')).toBe(`Avatar  My__classname`);
  });

  it('should render Image with src and alt props', () => {
    const wrapper = shallow(<Avatar {...props} />);
    expect(wrapper.find(Image).prop('src')).toBe('/img');
    expect(wrapper.find(Image).prop('alt')).toBe('my img');
    expect(
      wrapper
        .find(Image)
        .find(UserIcon)
        .exists()
    ).toBe(true);
  });

  it('should render UserIcon', () => {
    const wrapper = shallow(<Avatar {...props} />);
    expect(wrapper.find(UserIcon).prop('className')).toBe('Avatar__placeholder-icon');
  });
});
