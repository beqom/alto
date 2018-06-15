import React from 'react';
import { shallow } from 'enzyme';

import Breadcrumb from '../Breadcrumb';
import ChevronLeft from '../../Icons/ChevronLeft';
import ChevronRight from '../../Icons/ChevronRight';
import Link from '../../Link';

const items = [
  { title: 'Foo', url: '/foo' },
  { title: 'Bar', url: '/bar' },
  { title: 'Baz', url: '/baz' },
];

describe('<Breadcrumb />', () => {
  it('should not render if no items are provided', () => {
    const wrapper = shallow(<Breadcrumb />);
    expect(wrapper.type()).toBe(null);
  });

  it('should render with all items', () => {
    const wrapper = shallow(<Breadcrumb items={items} />);
    expect(wrapper.type()).toBe('ul');
    expect(wrapper.children().length).toBe(3);
    expect(wrapper.childAt(0).type()).toBe('li');
  });

  it('should support className and id prop', () => {
    const wrapper = shallow(<Breadcrumb items={items} className="my-classname" id="my-id" />);
    expect(wrapper.type()).toBe('ul');
    expect(wrapper.prop('className')).toBe('Breadcrumb my-classname');
    expect(wrapper.prop('id')).toBe('my-id');
  });

  it('should render correctly first item', () => {
    const wrapper = shallow(<Breadcrumb items={items} id="my-id" />);
    const first = wrapper.childAt(0);
    expect(first.children().length).toBe(1);
    expect(first.childAt(0).type()).toBe(Link);
    expect(first.childAt(0).prop('id')).toBe('my-id__item--0');
    expect(first.childAt(0).prop('href')).toBe('/foo');
    expect(first.childAt(0).prop('children')).toBe('Foo');
  });

  it('should render correctly non-first items', () => {
    const wrapper = shallow(<Breadcrumb items={items} id="my-id" />);
    const second = wrapper.childAt(1);
    expect(second.children().length).toBe(2);
    expect(second.childAt(0).type()).toBe(ChevronRight);
    expect(second.childAt(1).type()).toBe(Link);
    expect(second.childAt(1).prop('id')).toBe('my-id__item--1');
    expect(second.childAt(1).prop('href')).toBe('/bar');
    expect(second.childAt(1).prop('children')).toBe('Bar');
  });

  it('should render with 1 item', () => {
    const wrapper = shallow(<Breadcrumb items={items.slice(0, 1)} />);
    expect(wrapper.type()).toBe('ul');
    expect(wrapper.children().length).toBe(1);
    expect(wrapper.childAt(0).type()).toBe('li');
  });

  it('should render correctly first item if only one item is provided', () => {
    const wrapper = shallow(
      <Breadcrumb items={items.slice(0, 1)} id="my-id" backToLabel="Back to" />
    );
    const first = wrapper.childAt(0);
    expect(first.children().length).toBe(2);
    expect(first.childAt(0).type()).toBe(ChevronLeft);
    expect(first.childAt(1).type()).toBe(Link);
    expect(first.childAt(1).prop('id')).toBe('my-id__item--0');
    expect(first.childAt(1).prop('href')).toBe('/foo');
    expect(first.childAt(1).prop('children')).toBe('Back to Foo');
  });
});
