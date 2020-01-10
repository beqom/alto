import React from 'react';
import { mount } from 'enzyme';
import { GroupItemComponent as GroupItem } from './../GroupItem';
import { Provider as ContextProvider } from './../context';

jest.mock('../context', () => ({
  Provider: ({ children }) => <div>{children}</div>,
}));

describe('GroupItem', () => {
  const props = {
    items: ['a', 'b', 'c'],
    index: 0,
    column: 1,
    splitted: 2,
  };

  it('should have correct props', () => {
    const wrapper = mount(<GroupItem {...props} test="test-prop" />);

    expect(wrapper.find(ContextProvider).prop('value')).toEqual({
      first: true,
      last: false,
      row: false,
      column: true,
      splitted: true,
      stacked: false,
    });

    expect(wrapper.find('li').props()).toEqual({ test: 'test-prop' });
  });
});
