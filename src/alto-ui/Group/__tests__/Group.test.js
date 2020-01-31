import React from 'react';
import { mount } from 'enzyme';

import { GroupItemComponent } from '../GroupItem';
import Group from '../Group';

describe('Group', () => {
  const defaultProps = {
    items: [],
  };

  const getWrapper = props => mount(<Group {...defaultProps} {...props} />);

  it('should render without error', () => {
    const wrapper = getWrapper();
    expect(wrapper.find('.Group').exists()).toBe(true);
  });

  it('should render with classNames from props', () => {
    const props = {
      prop_mock: 'prop_mock',
      column: true,
      splitted: true,
    };

    const wrapper = getWrapper(props);

    expect(wrapper.prop('prop_mock')).toBe('prop_mock');
    expect(wrapper.find('.Group--column')).toBeTruthy();
    expect(wrapper.find('.Group--splitted')).toBeTruthy();
  });

  it('should render children element if children prop no functions', () => {
    const props = {
      children: 'Children text',
    };

    const wrapper = getWrapper(props);

    expect(wrapper.find('ul').text()).toBe('Children text');
  });

  describe('should render GroupItem', () => {
    const itemKey = jest.fn();
    const children = jest.fn();

    let wrapper;
    let items;
    let props;

    beforeEach(() => {
      jest.clearAllMocks();
      items = ['Children_1', 'Children_2'];
      props = {
        itemKey,
        items,
        children,
        splitted: 'test',
        column: [],
      };
      wrapper = getWrapper(props);
    });

    it('without error', () => {
      expect(wrapper.find(GroupItemComponent)).toHaveLength(items.length);
    });

    it('should call itemKey function', () => {
      expect(itemKey).toHaveBeenCalledTimes(items.length);
    });

    it('should call children function', () => {
      expect(children).toHaveBeenNthCalledWith(1, items[0], 0, items);
      expect(children).toHaveBeenNthCalledWith(2, items[1], 1, items);

      expect(children).toHaveBeenCalledTimes(items.length);
    });
  });
});
