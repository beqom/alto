import React from 'react';
import { mount, shallow } from 'enzyme';

import SkipLink from '../SkipLink';

describe('SkipLink', () => {
  beforeEach(() => jest.resetAllMocks());

  const defaultProps = {
    target: 'target',
  };

  const getWrapper = props => shallow(<SkipLink {...defaultProps} {...props} />);

  it('should render without error', () => {
    const wrapper = getWrapper({});

    expect(wrapper.find('.SkipLink').exists()).toBe(true);
  });

  it('should pass target props to a href attribute', () => {
    const wrapper = getWrapper({});

    expect(wrapper.find('.SkipLink').prop('href')).toBe('#target');
  });

  it('should call handleFocus function after button is clicked', () => {
    const focus = jest.fn();
    window.document.getElementById = jest.fn().mockReturnValue({ tabIndex: 1, focus });

    const props = {
      preventDefault: jest.fn(),
    };

    const wrapper = getWrapper(props);

    wrapper.find('.SkipLink').simulate('click', props);

    expect(focus).toHaveBeenCalledTimes(1);
  });

  describe('Check tabIndex by click event', () => {
    let inputElement;
    let wrapper;

    beforeAll(() => {
      inputElement = document.createElement('input');
      document.body.appendChild(inputElement);
      document.getElementById = () => inputElement;
      wrapper = mount(<SkipLink key="2" target="test" />);
    });

    it('should be not focused', () => {
      expect(document.activeElement).not.toBe(inputElement);
    });

    it('should have tabIndex === 0 as default', () => {
      expect(inputElement.tabIndex).toBe(0);
      wrapper.find('a').simulate('click');
      expect(inputElement.tabIndex).toBe(0);
    });

    it('should be focused', () => {
      expect(document.activeElement).toBe(inputElement);
    });

    it('should not change tab index if bigger than 0', () => {
      inputElement.tabIndex = 2;
      wrapper.find('a').simulate('click');
      expect(inputElement.tabIndex).toBe(2);
    });
  });
});