import React from 'react';
import { shallow } from 'enzyme';

import Badge from '../Badge';

describe('Badge', () => {
  it('should render without error', () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper.find('.Badge')).toHaveLength(1);
  });

  it('should pass id props', () => {
    const wrapper = shallow(<Badge />);
    wrapper.setProps({ id: 'test' });
    expect(wrapper.find({ id: 'test' })).toHaveLength(1);
  });

  it('should return color classNames from color named props', () => {
    const props = {
      red: true,
    };

    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.hasClass('Badge')).toBe(true);
    expect(wrapper.hasClass('Badge--red')).toBe(true);
  });

  it('should update className when color props change', () => {
    const props = {
      red: true,
      blue: false,
    };
    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.hasClass('Badge--red')).toBe(true);

    wrapper.setProps({
      red: false,
      blue: true,
    });
    expect(wrapper.hasClass('Badge--blue')).toBe(true);
  });
});
