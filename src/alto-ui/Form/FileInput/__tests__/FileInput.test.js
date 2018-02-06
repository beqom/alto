import React from 'react';
import { shallow } from 'enzyme';

import FileInput from '../FileInput';
import Button from '../../../Button';

const props = {
  id: 'my-file-input',
  onChange: jest.fn(),
  label: 'Choose a file',
  accept: 'image/x-png,image/gif,image/jpeg',
  name: 'foo',
  required: false,
};

describe('<FileInput />', () => {
  it('should render a input[type=file] component with the good props', () => {
    const wrapper = shallow(<FileInput {...props} />);
    const input = wrapper.find('input');
    expect(input.length).toBe(1);
    expect(input.prop('type')).toBe('file');
    expect(input.prop('id')).toBe(props.id);
    expect(input.prop('onChange')).toBe(props.onChange);
    expect(input.prop('accept')).toBe(props.accept);
    expect(input.prop('name')).toBe(props.name);
    expect(input.prop('required')).toBe(props.required);
  });

  it('should render a label with a Button component with the good props', () => {
    const wrapper = shallow(<FileInput {...props} />);
    const label = wrapper.find(Button);
    expect(label.length).toBe(1);
    expect(label.prop('tag')).toBe('label');
    expect(label.prop('htmlFor')).toBe(props.id);
    expect(label.prop('children')).toBe(props.label);
  });

  it('should support button props', () => {
    const buttonProps = {
      disabled: true,
      outline: true,
      flat: true,
      danger: true,
      success: true,
      white: true,
      large: true,
      small: true,
      block: true,
      nowrap: true,
    };
    const wrapper = shallow(<FileInput {...props} {...buttonProps} />);
    const label = wrapper.find(Button);
    Object.entries(buttonProps).forEach(([prop, value]) => {
      expect(label.prop(prop)).toBe(value);
    });
  });
});
