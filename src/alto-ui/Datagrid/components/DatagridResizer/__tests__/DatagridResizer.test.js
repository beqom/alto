import React from 'react';
import { shallow, mount } from 'enzyme';
import Draggable from 'react-draggable';

import DatagridResizer from '../DatagridResizer';

describe('DatagridResizer component', () => {
  const mockedProps = {
    left: 5,
    top: 5,
    handleHeight: 10,
    height: 10,
    maxLeft: 5,
    maxRight: 10,
    resizing: true,
    onStart: jest.fn(),
    onStop: jest.fn(),
  };

  const getWrapper = (props = {}, fn = shallow) =>
    fn(<DatagridResizer {...mockedProps} {...props} />);

  it('should render Draggable component', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(Draggable)).toHaveLength(1);
  });

  it('should pass correct props', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(Draggable).prop('axis')).toBe('x');
    expect(wrapper.find(Draggable).prop('position')).toEqual({ x: 0, y: 0 });
    expect(wrapper.find(Draggable).prop('bounds')).toEqual({
      left: 0,
      right: 5,
      top: 0,
      bottom: 0,
    });
    expect(typeof wrapper.find(Draggable).prop('onStart')).toBe('function');
    expect(typeof wrapper.find(Draggable).prop('onDrag')).toBe('function');
    expect(typeof wrapper.find(Draggable).prop('onStop')).toBe('function');
  });

  it('should invoked onStart funtion when clicked', () => {
    const onStart = jest.fn();
    const wrapper = getWrapper({ onStart }, mount);

    wrapper.simulate('mousedown');

    expect(onStart).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should invoked onStop funtion when clicked', () => {
    const onStop = jest.fn();

    const wrapper = getWrapper({ onStop }, mount);

    wrapper.simulate('mousedown');
    wrapper.update();
    wrapper.simulate('mouseup');

    expect(onStop).toHaveBeenCalled();

    wrapper.unmount();
  });

  it('should properly invoked onDrag prop in Draggable component', () => {
    const wrapper = getWrapper();

    const mouseMove = new Event('mousemove');
    wrapper.find(Draggable).invoke('onDrag')(mouseMove, { x: 900 });

    expect(wrapper.find(Draggable).prop('position')).toEqual({ x: 900, y: 0 });
  });

  it('should properly update state when props changed', () => {
    const wrapper = getWrapper();
    wrapper.setProps({ left: 500 });

    expect(wrapper.find(Draggable).prop('position')).toEqual({ x: 0, y: 0 });
  });
});
