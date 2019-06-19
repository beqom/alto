import React from 'react';
import { shallow } from 'enzyme';

import Media from '../Media';
import Avatar from '../../Avatar';
import Image from '../../Image';

const props = { title: 'Hello world!' };

describe('<Media />', () => {
  it('should render a button component', () => {
    const wrapper = shallow(<Media {...props} />);
    expect(wrapper.type()).toBe('div');
  });

  it('should support severals modifiers', () => {
    ['large', 'small', 'white', 'wrap'].forEach(modifier => {
      const wrapper = shallow(<Media {...props} {...{ [modifier]: true }} />);
      expect(wrapper.prop('className')).toBe(`Media Media--${modifier}`);
    });
  });

  it('should support className props', () => {
    const wrapper = shallow(<Media {...props} className="My__classname" />);
    expect(wrapper.prop('className')).toBe(`Media  My__classname`);
  });

  it('should render an <Avatar />', () => {
    const wrapper = shallow(
      <Media {...props} src="cake.jpg" alt="It is a lie" large small={false} />
    );
    const avatar = wrapper.find(Avatar);
    expect(avatar.prop('src')).toBe('cake.jpg');
    expect(avatar.prop('alt')).toBe('It is a lie');
    expect(avatar.prop('large')).toBe(true);
    expect(avatar.prop('small')).toBe(false);
  });

  it('should render the title', () => {
    const wrapper = shallow(<Media {...props} />);
    const content = wrapper.childAt(0);
    expect(content.childAt(0).text()).toBe(props.title);
  });

  it('should render a subtitle if defined', () => {
    const subTitle = 'Welcome to Aperture Science.';
    const wrapper = shallow(<Media {...props} subtitle={subTitle} />);
    const content = wrapper.childAt(0);
    expect(content.childAt(1).text()).toBe(subTitle);
  });
});
