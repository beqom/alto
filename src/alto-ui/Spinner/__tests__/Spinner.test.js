import React from 'react';
import { shallow } from 'enzyme';

import Spinner from '../Spinner';

jest.mock('../../CloseButton', () => ({ onClick }) => (
  <button className="CloseButton" onClick={() => onClick()} />
));

describe('Spinner', () => {
  const getWrapper = props => shallow(<Spinner {...props} />);

  it('should return null if show props are falsy', () => {
    const props = {
      show: false,
    };

    const wrapper = getWrapper(props);

    expect(wrapper.getElement()).toBeNull();
  });

  it('should return children if show props are falsy', () => {
    const props = {
      show: false,
      children: 'true',
    };

    const wrapper = getWrapper(props);

    expect(wrapper.text()).toBe('true');
  });

  it('should render Spinner element with props', () => {
    const props = {
      id: 'id',
      small: true,
      large: true,
    };

    const wrapper = getWrapper(props);

    expect(wrapper.find('#id').exists()).toBe(true);
    expect(wrapper.find('.Spinner--small').exists()).toBe(true);
    expect(wrapper.find('.Spinner--large').exists()).toBe(true);
  });

  it('should render element with Spinner--centered__wrapper className', () => {
    const props = {
      centered: true,
    };

    const wrapper = getWrapper(props);

    expect(wrapper.find('.Spinner--centered__wrapper').exists()).toBe(true);
  });

  it('should render spinner inside of Spinner--centered__wrapper element', () => {
    const props = {
      centered: true,
    };

    const wrapper = getWrapper(props);

    expect(wrapper.find('.Spinner--centered__wrapper').exists()).toBe(true);
    expect(wrapper.find('.Spinner').exists()).toBe(true);
  });
});
