import React from 'react';
import { mount } from 'enzyme';

import Tabs from '../Tabs';

describe('Tabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getWrapper = (defaultProps, props) => mount(<Tabs {...defaultProps} {...props} />);

  describe('renderLinks', () => {
    const defaultProps = {
      items: [{ title: 'title_1', url: 'url_1' }],
    };

    it('should render if value prop is not passed', () => {
      const wrapper = getWrapper(defaultProps);

      expect(wrapper.find('.tabs').exists()).toBe(true);
    });

    it('should render li element with key prop', () => {
      const wrapper = getWrapper(defaultProps, {});

      expect(wrapper.find('.tabs__tab').getElement()).toHaveProperty('key', 'url_1');
    });

    it('should render Link element', () => {
      const wrapper = getWrapper(defaultProps, {});

      expect(wrapper.find('.tabs__tab').exists()).toBe(true);
    });

    it('should render Link element with props', () => {
      expect(
        getWrapper(defaultProps, {})
          .find('.tabs__link')
          .at(0)
          .prop('id')
      ).toBeUndefined();
      expect(
        getWrapper(defaultProps, { id: 'id' })
          .find('.tabs__link')
          .at(0)
          .prop('id')
      ).toBe('id__link--0');
      expect(
        getWrapper(defaultProps, {})
          .find('.tabs__link')
          .at(0)
          .prop('href')
      ).toBe('url_1');
      expect(
        getWrapper(defaultProps, { currentUrl: 'url_1' })
          .find('.tabs__link')
          .at(0)
          .prop('className')
      ).toBe('tabs__link tabs__link--active');
    });
  });

  describe('renderButtons', () => {
    const defaultProps = {
      id: 'id',
      value: true,
      items: [{ title: 'title_1', url: 'url_1', value: true }],
    };

    it('should render if value prop is passed', () => {
      const wrapper = getWrapper(defaultProps, {});

      expect(wrapper.find('.tabs__button').exists()).toBe(true);
    });

    it('should render with props', () => {
      const props = {
        id: 'id',
        onChange: jest.fn(),
      };

      const wrapper = getWrapper(defaultProps, props);

      expect(
        wrapper
          .find('.tabs__button')
          .at(0)
          .prop('id')
      ).toBe('id__button--0');
      expect(
        wrapper
          .find('.tabs__button')
          .at(0)
          .prop('className')
      ).toBe('tabs__button tabs__button--active');
      expect(
        wrapper
          .find('.tabs__button')
          .at(0)
          .prop('flat')
      ).toBe(true);
    });

    it('should render button inner text from props', () => {
      const wrapper = getWrapper(defaultProps, {});

      expect(
        wrapper
          .find('.tabs__button')
          .at(0)
          .text()
      ).toBe('title_1');
    });

    describe('getHandleChange', () => {
      it('should return null', () => {
        const mockFunc = jest.fn();

        const props = {
          items: [{ title: 'title_1', url: 'url_1', value: true }],
          onChange: mockFunc,
        };

        const wrapper = getWrapper(defaultProps, props);
        const button = wrapper.find('.tabs__button').at(0);
        button.simulate('click');

        expect(mockFunc).toHaveBeenCalledTimes(0);
      });

      it('should call onChange prop function', () => {
        const mockFunc = jest.fn();

        const props = {
          items: [{ title: 'title_1', url: 'url_1', value: false }],
          onChange: mockFunc,
        };

        const wrapper = getWrapper(defaultProps, props);
        const button = wrapper.find('.tabs__button').at(0);

        button.simulate('click');

        expect(mockFunc).toHaveBeenCalledTimes(1);
      });
    });
  });
});