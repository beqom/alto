import React from 'react';
import { shallow } from 'enzyme';

import Tree from '../Tree';

import { getKey } from './../helpers';

jest.mock('./../helpers', () => ({
  getKey: jest.fn(({ key }) => key),
}));

describe('Tree', () => {
  beforeEach(() => {
    getKey.mockClear();
  });

  const defaultProps = {
    id: 'id',
    items: [{ key: 'key_1' }, { key: 'key_2' }],
  };

  const getWrapper = props => shallow(<Tree {...defaultProps} {...props} />);

  it('should render without error', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('.Tree').exists()).toBe(true);
  });

  describe('getKey func', () => {
    it('should be called 4 times', () => {
      getWrapper();

      expect(getKey).toHaveBeenCalledTimes(4);
    });

    it('should pass formated value to TreeItem id value', () => {
      const wrapper = getWrapper();

      expect(wrapper.find('#id__item--key_1-0')).toHaveLength(1);
      expect(wrapper.find('#id__item--key_2-1')).toHaveLength(1);
    });

    it('should pass formated value to TreeItem key value', () => {
      const wrapper = getWrapper();

      expect(wrapper.find('#id__item--key_1-0').key()).toBe('key_1');
      expect(wrapper.find('#id__item--key_2-1').key()).toBe('key_2');
    });
  });
});