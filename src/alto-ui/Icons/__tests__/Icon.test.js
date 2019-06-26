import React from 'react';
import { shallow } from 'enzyme';

import Icon from '../Icon';
import VisuallyHidden from '../../VisuallyHidden';

const props = {
  children: jest.fn(() => <g />),
};

describe('<Icon /> (used in icons)', () => {
  it('should render a <i /> correctly', () => {
    const wrapper = shallow(<Icon {...props} />);
    expect(wrapper.type()).toBe('i');
  });

  it('should render a <svg /> with the good props', () => {
    const viewBox = '0 0 1 1';
    const wrapper = shallow(<Icon {...props} viewBox={viewBox} />);
    const svg = wrapper.childAt(0);
    expect(svg.prop('version')).toBe('1.1');
    expect(svg.prop('viewBox')).toBe(viewBox);
    expect(svg.prop('width')).toBe('1em');
    expect(svg.prop('height')).toBe('1em');
    expect(svg.prop('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svg.prop('role')).toBe('presentation');
  });

  it('should render a the children function with the good param', () => {
    const children = jest.fn();
    shallow(
      <Icon color="blue" weight={2}>
        {children}
      </Icon>
    );
    expect(children).toBeCalledWith({ fill: 'blue', stroke: 'blue', strokeWidth: 2 });
  });

  it('should render foward props', () => {
    const wrapper = shallow(<Icon {...props} title="hello" className="my-icon" />);
    expect(wrapper.prop('title')).toBe('hello');
    expect(wrapper.prop('className')).toBe('Icon  my-icon');
  });

  it('should add modifier', () => {
    ['baseline', 'left', 'right'].forEach(modifier => {
      const wrapper = shallow(<Icon {...props} {...{ [modifier]: true }} />);
      expect(wrapper.prop('className')).toBe(`Icon Icon--${modifier}`);
    });
  });

  it('should render a <button /> if props.onClick', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Icon {...props} onClick={onClick} />);
    expect(wrapper.type()).toBe('button');
    expect(wrapper.prop('className')).toBe(`Icon Icon--button`);
  });

  it('should have the good style if props.size is set', () => {
    const wrapper = shallow(<Icon {...props} size="2em" />);
    expect(wrapper.prop('style')).toEqual({
      width: '2em',
      height: '2em',
      fontSize: '2em',
    });
  });

  it('should have the good style if props.size is set and it is a button', () => {
    const wrapper = shallow(<Icon {...props} size="3em" onClick={jest.fn()} />);
    expect(wrapper.prop('style')).toEqual({
      fontSize: '3em',
    });
  });

  it('should render a <VisuallyHidden /> with props.a11yLabel', () => {
    const wrapper = shallow(<Icon {...props} a11yLabel="hello screenreader" />);
    expect(wrapper.find(VisuallyHidden).prop('children')).toBe('hello screenreader');
  });

  it('should render a badge (<circle />) if props.badged is true', () => {
    const wrapper = shallow(<Icon {...props} badged />);
    const circle = wrapper.find('svg').childAt(1);
    expect(circle.prop('cx')).toBe('30');
    expect(circle.prop('cy')).toBe('6');
    expect(circle.prop('r')).toBe('5');
  });
});
