import React from 'react';
import { mount } from 'enzyme';

import Aside from '../Aside';
import CloseButton from '../../CloseButton';

jest.mock('../../CloseButton', () => () => <div className="CloseButton" />)

describe('Aside', () => {

  const getWrapper = props => mount(<Aside {...props} />)

  it('should no render if show prop is falsy', () => {
    const props = {
      show: false,
    };
    const wrapper = getWrapper(props);

    expect(wrapper.find('aside')).toHaveLength(0);
  });

  it('should render if show prop is truthy', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('aside')).toHaveLength(1);
  });

  it('should render element form children props', () => {
    const props = {
      children: 'test'
    }
    const wrapper = getWrapper(props);

    expect(wrapper.find('.Aside__content').html()).toContain('test')
  });

  describe('CloseButton', () => {
    it('should render if onClose prop is truthy', () => {
      const props = {
        onClose: jest.fn()
      }
      const wrapper = getWrapper(props);
  
      const CloseButtonMock = wrapper.find(CloseButton);
      expect(CloseButtonMock).toHaveLength(1);
    });

    it('should support show and a11yCloseLabel prop', () => {
      const props = {
        a11yCloseLabel: 'test',
        onClose: jest.fn(),
        show: true,
      };
      
      const wrapper = getWrapper(props)

      const { show, a11yCloseLabel } = wrapper.find(Aside).props();
      expect(show).toBe(true);
      expect(a11yCloseLabel).toBe('test');
    });
  })
});
