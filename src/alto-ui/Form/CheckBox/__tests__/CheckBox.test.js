import React from 'react';
import { shallow } from 'enzyme';

import CheckBox from '../CheckBox';

describe('<CheckBox />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<CheckBox id="my-checkbox" label="Are you still alive" />);
    expect(wrapper.find('.CheckBox').exists()).toBe(true);
    expect(wrapper.children().length).toBe(2);
  });

  it('should render correctly the <input />', () => {
    const wrapper = shallow(<CheckBox id="my-checkbox" label="Are you still alive" />);
    const input = wrapper.childAt(0);
    expect(input.type()).toBe('input');
    expect(input.prop('type')).toBe('checkbox');
  });

  it('should spread the good props to the <input />', () => {
    const props = {
      id: 'my-checkbox',
      checked: true,
      onChange: jest.fn(),
      title: 'This is a checkbox',
    };
    const wrapper = shallow(<CheckBox {...props} label="Are you still alive" />);
    const input = wrapper.childAt(0);
    expect(input.props()).toEqual(expect.objectContaining(props));
  });

  it('should render correctly the <label />', () => {
    const wrapper = shallow(
      <CheckBox id="my-checkbox" label="Are you still alive" checked disabled />
    );
    const label = wrapper.childAt(1);
    expect(label.type()).toBe('label');
    expect(label.prop('htmlFor')).toBe('my-checkbox');
    expect(label.text()).toBe('Are you still alive');
  });
});
