import React from 'react';
import { mount } from 'enzyme';

import Tabs from '../Tabs';

describe('Tabs', () => {
  let defaultProps;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const getWrapperCurrying = defaultProps => props =>  mount(<Tabs {...defaultProps} {...props} />);

  describe('renderLinks', () => {
    const getWrapper = getWrapperCurrying({
      items: [{ title: 'title_1', url: 'url_1' }],
    });

    it('should render if value prop is not passed', () => {
      const wrapper = getWrapper(defaultProps);

      expect(wrapper.find('.tabs').exists()).toBe(true);
    });

    it('should render li Link element with key prop', () => {
      const wrapper = getWrapper(defaultProps);

      expect(wrapper.find('.tabs__tab').getElement()).toHaveProperty('key', 'url_1');
    });

    it('should render Link element', () => {
      const wrapper = getWrapper(defaultProps);

      expect(wrapper.find('.tabs__tab').exists()).toBe(true);
    });

    it.only('should render Link element with correct props',() => {
      const tabWithoutProps = getWrapper(defaultProps).find('.tabs__link').at(0);
      const tabWithProps = getWrapper(defaultProps, {id: 'id', currentUrl: `url_1`}).find('.tabs__link').at(0);
    
      expect(tabWithoutProps.prop('id')).toBeUndefined();
      expect(tabWithoutProps.prop('href')).toBe('url_1');
      expect(tabWithProps.prop('id').toBe('id__link--0'));
      expect(tabWithProps.prop('className').toBe('id__link--0')).toBe('tabs__link tabs__link--active');
    });
  });

  describe('renderButtons', () => {
    const getWrapper = getWrapperCurrying({
      id: 'id',
      value: true,
      items: [{ title: 'title_1', url: 'url_1', value: true }],
    });

    it('should render if value prop is passed', () => {
      const wrapper = getWrapper(defaultProps, {});

      expect(wrapper.find('.tabs__button').exists()).toBe(true);
    });

    it('should render and past correct props to tabs button container', () => {
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
      let mockFunc = jest.fn();

      let button;
      let wrapper;

      beforeEach(() => {
        //let mockFunc = jest.fn();
        mockFunc.mockClear();

        const props = {
          items: [{ title: 'title_1', url: 'url_1', value: true }],
        }

        button = wrapper.find('.tabs__button').at(0);
        // wrapper = getWrapper(defaultProps, props);
      })

      it('should return null', () => {
        //const mockFunc = jest.fn();

        const props = {onChange: mockFunc};

        const wrapper = getWrapper(defaultProps, props);
        button.simulate('click');

        expect(mockFunc).toHaveBeenCalledTimes(0);
      });

      it('should call onChange prop function', () => {
        const mockFunc = jest.fn();

        const props = {onChange: mockFunc};

        const wrapper = getWrapper(defaultProps, props);
        button.simulate('click');

        expect(mockFunc).toHaveBeenCalledTimes(1);
      });
    });
  });
});