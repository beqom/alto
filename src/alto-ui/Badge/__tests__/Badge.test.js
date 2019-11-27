import React from 'react';
import { shallow } from 'enzyme';

import Badge from '../Badge';

describe('Badge', () => {

  it('is Badge', () => {
    const wrapper = shallow(<Badge />);
    expect(wrapper.find('.Badge')).toHaveLength(1)
  });

  it('should return color classNames from color named props', () => {
    const props = {
      red: true
    }

    const wrapper = shallow(<Badge {...props} />);
    expect(wrapper.html()).toBe('<div class="Badge Badge--red"></div>');
  });
});
