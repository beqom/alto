import React from 'react';
import { shallow } from 'enzyme';

import MediaObject from '../MediaObject';
import Avatar from '../../Avatar';
import Image from '../../Image';

const props = { title: 'Hello world!' };

describe('<MediaObject />', () => {
  it('should render a button component', () => {
    const wrapper = shallow(<MediaObject {...props} />);
    expect(wrapper.type()).toBe('div');
  });

  it('should support severals modifiers', () => {
    ['large', 'small', 'white', 'danger', 'success', 'top', 'wrap'].forEach(modifier => {
      const wrapper = shallow(<MediaObject {...props} {...{ [modifier]: true }} />);
      expect(wrapper.prop('className')).toBe(`MediaObject MediaObject--${modifier}`);
    });
  });

  it('should support className props', () => {
    const wrapper = shallow(<MediaObject {...props} className="My__classname" />);
    expect(wrapper.prop('className')).toBe(`MediaObject  My__classname`);
  });

  it('should render Image if src is defined', () => {
    const wrapper = shallow(<MediaObject {...props} src="cake.jpg" alt="It is a lie" />);
    const img = wrapper.find(Image);
    expect(img.prop('src')).toBe('cake.jpg');
    expect(img.prop('alt')).toBe('It is a lie');
    expect(img.prop('style')).toEqual({});
    expect(img.childAt(0).prop('style')).toEqual({});
  });

  it('should render Image if width and height in style if they are defined in props', () => {
    const width = 400;
    const height = 300;
    const wrapper = shallow(
      <MediaObject {...props} imageWidth={width} imageHeight={height} src="cake.jpg" />
    );
    const img = wrapper.find(Image);

    expect(img.prop('style')).toEqual({
      maxWidth: width,
      maxHeight: height,
    });
    expect(img.childAt(0).prop('style')).toEqual({
      width,
      height,
    });
  });

  it('should render an <Avatar /> instead of the <Image /> if props.avatar is true', () => {
    const wrapper = shallow(
      <MediaObject {...props} src="cake.jpg" alt="It is a lie" avatar large small={false} />
    );
    const avatar = wrapper.find(Avatar);
    expect(avatar.prop('src')).toBe('cake.jpg');
    expect(avatar.prop('alt')).toBe('It is a lie');
    expect(avatar.prop('large')).toBe(true);
    expect(avatar.prop('small')).toBe(false);
  });

  it('should render the title', () => {
    const wrapper = shallow(<MediaObject {...props} />);
    const content = wrapper.childAt(0);
    expect(content.childAt(0).text()).toBe(props.title);
  });

  it('should render a subtitle if defined', () => {
    const subTitle = 'Welcome to Aperture Science.';
    const wrapper = shallow(<MediaObject {...props} subtitle={subTitle} />);
    const content = wrapper.childAt(0);
    expect(content.childAt(1).text()).toBe(subTitle);
  });
});
