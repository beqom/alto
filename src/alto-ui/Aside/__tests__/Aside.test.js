import React from 'react';
import { mount } from 'enzyme';

import Aside from '../Aside';
import CloseButton from '../../CloseButton';

jest.mock('../../CloseButton', () => {
  return () => {
    return <div className="CloseButton" />;
  };
});

describe('<Aside />', () => {

  const getWrapper = props => {
    console.log(props);
    return mount(<Aside {...props} />);
  };

  it('should return null if show props is falsy', () => {
    const props = {
      show: false,
    };
    const wrapper = getWrapper(props);

    expect(wrapper.find('.Aside__header')).toHaveLength(0);
    expect(wrapper.find('.Aside__content').exists()).toBe(false);
  });

  it('should render if show prop is truthy', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('.Aside__header')).toHaveLength(1);
    expect(wrapper.find('.Aside__content').exists()).toBe(true);
  });

  it('should support show and a11yCloseLabel prop', () => {
    const props = {
      a11yCloseLabel: 'test',
    };
    const wrapper = getWrapper(props);

    expect(wrapper.find(Aside).prop('show')).toBe(true);
    expect(wrapper.find(Aside).prop('a11yCloseLabel')).toBe('test');
  });

  it('should render CloseButton if onClose prop is truthy', () => {
    const props = {
      onClose: jest.fn()
    }
    const wrapper = getWrapper(props);

    const CloseButtonMock = wrapper.find(CloseButton);
    expect(CloseButtonMock).toHaveLength(1);
  });
});
