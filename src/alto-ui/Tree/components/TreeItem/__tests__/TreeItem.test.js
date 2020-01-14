import React from 'react';
import { mount } from 'enzyme';

import TreeItem from '../TreeItem';

import { getKey } from '../../../helpers';

jest.mock('../../../helpers', () => ({
  getKey: jest.fn(),
}));

jest.mock('../../../../Icons/ChevronRight', () => () => <div className="ChevronRight" />);

describe('TreeItem', () => {
  const hasChildren = jest.fn();
  beforeEach(() => jest.resetAllMocks());
  const defaultProps = {
    hasChildren,
    state: {
      open: true,
      fetching: true,
      children: [],
    },
    renderItem: jest.fn(),
  };

  const getWrapper = props => mount(<TreeItem {...defaultProps} {...props} />);

  it('should render without error', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('.TreeItem').exists()).toBe(true);
    expect(wrapper.find('.TreeItem__title').exists()).toBe(true);
  });

  it('should render TreeItem__title--final element', () => {
    const obj = {
      key: 'val',
    };
    const wrapper = getWrapper({ item: obj });

    expect(wrapper.find('.TreeItem__title--final').exists()).toBe(true);
    expect(hasChildren).toHaveBeenCalledWith(obj);
  });

  it('should render TreeItem__spinner element', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('.TreeItem__spinner').exists()).toBe(true);
  });

  describe('TreeItem__toggle-button element', () => {
    const getCurrentWrapper = props => {
      const { state: stateProps } = defaultProps;
      return getWrapper({
        ...defaultProps,
        state: {
          ...stateProps,
          fetching: false,
        },
        hasChildren: jest.fn().mockReturnValue(true),
        ...props,
      });
    };

    it('should render without error', () => {
      expect(
        getCurrentWrapper()
          .find('.TreeItem__toggle-button')
          .exists()
      ).toBe(true);
    });

    it('should render with open className', () => {
      expect(
        getCurrentWrapper()
          .find('.TreeItem__toggle-button--open')
          .exists()
      ).toBe(true);
    });

    it('should render right id', () => {
      expect(
        getCurrentWrapper({ id: 'id' })
          .find('#id__toggle-button')
          .exists()
      ).toBe(true);
    });

    it('should render ChevronRightIcon element', () => {
      expect(
        getCurrentWrapper()
          .find('.ChevronRight')
          .exists()
      ).toBe(true);
    });

    it('should call handleToggle prop after click', () => {
      const handleToggle = jest.fn();

      const wrapper = getCurrentWrapper({
        handleToggle: handleToggle(),
      });
      const button = wrapper.find('.TreeItem__toggle-button').at(0);

      button.simulate('click');

      expect(handleToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('Icon', () => {
    const { state: stateProps } = defaultProps;
    const getCurrentWrapper = props => {
      return getWrapper({
        ...defaultProps,
        state: {
          ...stateProps,
        },
        renderIcon: jest.fn().mockReturnValue(() => <div />),
        ...props,
      });
    };

    it('should render null', () => {
      expect(
        getCurrentWrapper({ renderIcon: null })
          .find('.TreeItem__icon')
          .exists()
      ).toBe(false);
      expect(
        getCurrentWrapper({ renderIcon: undefined })
          .find('.TreeItem__icon')
          .exists()
      ).toBe(false);
    });
    it('should render without error', () => {
      expect(
        getCurrentWrapper()
          .find('.TreeItem__icon')
          .exists()
      ).toBe(true);
    });

    it('should render with outline prop', () => {
      getKey.mockReturnValue([]);
      
      expect(
        getCurrentWrapper({ selected: {} })
          .find('.TreeItem__icon')
          .children()
          .prop('outline')
      ).toBe(true);
    });

    it('should render without outline prop', () => {
      const obj = {key: 'val'}

      expect(
        getCurrentWrapper({ selected: obj, item:obj })
          .find('.TreeItem__icon')
          .children()
          .prop('outline')
      ).toBe(false);

      getKey.mockReturnValue(obj);
      expect(
        getCurrentWrapper({ selected: obj })
          .find('.TreeItem__icon')
          .children()
          .prop('outline')
      ).toBe(false);
    });
      
    it('should call getKey with right value', () => {
        const props = {
          item: { key: 'value' },
          keyField: '1',
        };
        getCurrentWrapper(props);

        expect(getKey).toHaveBeenCalledWith({ key: 'value' }, '1');
      })
  });

  describe('ButtonOrLink', () => {
    const getCurrentWrapper = props => (getWrapper({ isClickable: true, ...props }))

    it('should render as Link element', () => {
      const wrapper = getCurrentWrapper({
        href: jest.fn().mockReturnValue('link'),
      });

      expect(wrapper.find('Link').exists()).toBe(true);
    });

    it('should render as button element', () => {
      const wrapper = getCurrentWrapper({
        href: 'href',
      });

      expect(wrapper.find('button').exists()).toBe(true);
    });

    it('should render with href attribute', () => {
      const hrefMock = jest.fn().mockReturnValue('link');
      const item = {key: 'val'};
      const selected = {key: 'val'};
      getCurrentWrapper({
        href: hrefMock,
        item,
        selected,
      });

      expect(hrefMock).toHaveBeenCalledTimes(1);
      expect(hrefMock).toHaveBeenCalledWith(item, selected);
    });

    it('should render button without error', () => {
      expect(
        getCurrentWrapper()
          .find('.TreeItem__button')
          .exists()
      ).toBe(true);
    });

    it('should render with id attribute', () => {
      expect(
        getCurrentWrapper({ id: 'id' })
          .find('#id__button')
          .exists()
      ).toBe(true);
    });

    it('should render with href attribute', () => {
      const wrapper = getCurrentWrapper({
        href: jest.fn().mockReturnValue('someLink'),
      });

      expect(
        wrapper
          .find('.TreeItem__button')
          .first()
          .find('a')
          .prop('href')
      ).toBe('someLink');
    });

    it('should render with active className', () => {
      const obj = { foo: 'bar' };
      const wrapper = getCurrentWrapper({
        selected: obj,
        item: obj,
      });

      expect(wrapper.find('.TreeItem__button--active').exists()).toBe(true);

      getKey.mockReturnValue('test');

      wrapper.setProps({ selected: 'test' });
      wrapper.update();

      expect(wrapper.find('.TreeItem__button--active').exists()).toBe(true);
    });

    it('should call renderItem function', () => {
      const mockRenderItem = jest.fn();
      const mockRenderItemTwo = jest.fn();

      const wrapper = getCurrentWrapper({
        renderItem: mockRenderItem,
      });

      expect(mockRenderItem).toHaveBeenCalledTimes(1);

      wrapper.setProps({
        renderItem: mockRenderItemTwo,
      });

      wrapper.update();

      expect(mockRenderItemTwo).toHaveBeenCalledTimes(1);
    });
  });

  describe('renderChildren', () => {
    const { state: stateProps } = defaultProps;
    const getCurrentWrapper = props => {
      return getWrapper({
        ...defaultProps,
        state: {
          ...stateProps,
          children: [{}],
        },
        isClickable: true,
        id: 'testId',
        loadMore: jest.fn(),
        labels: {
          loadMore: 'test_label',
        },
        childrenPerPage: 1,
        ...props,
      });
    };

    it('should render without error', () => {
      expect(
        getCurrentWrapper()
          .find('.TreeItem__subtree')
          .exists()
      ).toBe(true);
    });

    it('should render null', () => {
      getKey.mockReturnValue(
        Math.random()
          .toString(36)
          .substr(2, 9)
      );

      expect(
        getCurrentWrapper({
          state: {
            open: false,
          },
        })
          .find('.TreeItem__subtree')
          .exists()
      ).toBe(false);

      expect(
        getCurrentWrapper({
          state: {
            children: [],
          },
        })
          .find('.TreeItem__subtree')
          .exists()
      ).toBe(false);

      expect(
        getCurrentWrapper({
          state: {
            children: null,
          },
        })
          .find('.TreeItem__subtree')
          .exists()
      ).toBe(false);
    });

    it('should render Button element', () => {
      const wrapper = getCurrentWrapper();

      expect(wrapper.find('.TreeItem__button-load-more').exists()).toBe(true);
      expect(wrapper.find('#testId__load-more').exists()).toBe(true);
      expect(
        wrapper
          .find('.TreeItem__button-load-more')
          .at(0)
          .text()
      ).toBe('test_label');
    });

    it('should call loadMore function after Button is clicked', () => {
      const mockLoadMore = jest.fn();
      const button = getCurrentWrapper({
        loadMore: mockLoadMore,
      })
        .find('.TreeItem__button-load-more')
        .at(0);

      button.simulate('click');

      expect(mockLoadMore).toHaveBeenCalledTimes(1);
    });
  });
});