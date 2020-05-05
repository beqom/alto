import React from 'react';
import { mount } from 'enzyme';

import Tabs from '../Tabs';

describe('Tabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getWrapperCurrying = defaultProps => props => mount(<Tabs {...defaultProps} {...props} />);

  describe('renderLinks', () => {
    const getWrapper = getWrapperCurrying({
      items: [{ title: 'title_1', url: 'url_1' }],
    });

    it('should render if value prop is not passed', () => {
      const wrapper = getWrapper();

      expect(wrapper.find('.tabs').exists()).toBe(true);
    });

    it('should render li Link element with key prop', () => {
      const wrapper = getWrapper();

      expect(wrapper.find('.tabs__tab').getElement()).toHaveProperty('key', 'url_1');
    });

    it('should render Link element', () => {
      const wrapper = getWrapper();

      expect(wrapper.find('.tabs__tab').exists()).toBe(true);
    });

    it('should render Link element with correct props', () => {
      const tabWithoutProps = getWrapper()
        .find('.tabs__link')
        .at(0);
      const tabWithProps = getWrapper({ id: 'id', currentUrl: `url_1` })
        .find('.tabs__link')
        .at(0);

      expect(tabWithoutProps.prop('id')).toBeUndefined();
      expect(tabWithoutProps.prop('href')).toBe('url_1');
      expect(tabWithProps.prop('id')).toBe('id__link--0');
      expect(tabWithProps.prop('className')).toBe('tabs__link tabs__link--active');
    });
  });

  describe('renderButtons', () => {
    const getWrapper = getWrapperCurrying({
      id: 'id',
      value: true,
      items: [{ title: 'title_1', url: 'url_1', value: true }],
    });

    const getFirstButton = wrapper => wrapper.find('.tabs__button').at(0);

    it('should render if value prop is passed', () => {
      const tabsButton = getFirstButton(getWrapper());
      expect(tabsButton.exists()).toBe(true);
    });

    it('should render and past correct props to tabs button container', () => {
      const tabsButton = getFirstButton(getWrapper({ id: 'id', onChange: jest.fn() }));

      expect(tabsButton.prop('id')).toBe('id__button--0');
      expect(tabsButton.prop('className')).toBe('tabs__button tabs__button--active');
      expect(tabsButton.prop('flat')).toBe(true);
    });

    it('should render button inner text from props', () => {
      const tabsButton = getFirstButton(getWrapper());
      expect(tabsButton.text()).toBe('title_1');
    });

    describe('getHandleChange', () => {
      const checkHandleChange = (value = false) => {
        const mockFunc = jest.fn();

        const props = {
          items: [{ title: 'title_1', url: 'url_1', value }],
          onChange: mockFunc,
        };

        const wrapper = getWrapper(props);
        const button = getFirstButton(wrapper);
        button.simulate('click');

        return mockFunc;
      };

      it('should return null', () => {
        expect(checkHandleChange(true)).not.toHaveBeenCalled();
      });

      it('should call onChange prop function', () => {
        expect(checkHandleChange()).toHaveBeenCalledTimes(1);
      });
    });
  });
});
