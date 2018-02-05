import React from 'react';
import { shallow } from 'enzyme';

import ColorPicker from '../ColorPicker';
import VisuallyHidden from '../../../VisuallyHidden';

const props = {
  id: 'my-color-picker',
  name: 'color-picker-name',
  onChange: jest.fn(),
  color: '#FFFFFF',
  label: 'White',
  checked: false,
};

describe('<ColorPicker />', () => {
  it('should render a input[type=radio] component with the good props', () => {
    const wrapper = shallow(<ColorPicker {...props} />);
    const input = wrapper.find('input');
    expect(input.length).toBe(1);
    expect(input.prop('type')).toBe('radio');
    ['id', 'name', 'onChange', 'checked'].forEach(prop => {
      expect(input.prop(prop)).toBe(props[prop]);
    });
  });

  it('should render a label component with the good props', () => {
    const wrapper = shallow(<ColorPicker {...props} />);
    const label = wrapper.find('label');
    expect(label.length).toBe(1);
    expect(label.prop('htmlFor')).toBe(props.id);
  });

  it('should render a the prop.label in a VisuallyHidden component inside the <label />', () => {
    const wrapper = shallow(<ColorPicker {...props} />);
    const labelHidden = wrapper.find('label').find(VisuallyHidden);
    expect(labelHidden.length).toBe(1);
    expect(labelHidden.prop('children')).toBe(props.label);
  });
});
