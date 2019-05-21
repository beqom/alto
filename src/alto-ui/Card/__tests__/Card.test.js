import React from 'react';
import { shallow } from 'enzyme';

import Card from '../Card';

describe('<Card />', () => {
  it('should render correctly by default', () => {
    const wrapper = shallow(<Card>Hello world</Card>);
    expect(wrapper.type()).toBe('div');
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.childAt(0).prop('children')).toBe('Hello world');
  });

  it('should be able to render a title', () => {
    const wrapper = shallow(<Card title="Welcome to Aperture Science">My name is Glados</Card>);
    expect(wrapper.children().length).toBe(2);
    expect(wrapper.childAt(0).text()).toBe('Welcome to Aperture Science');
    expect(wrapper.childAt(1).prop('children')).toBe('My name is Glados');
  });
});
