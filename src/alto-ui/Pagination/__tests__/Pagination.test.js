import React from 'react';
import { shallow } from 'enzyme';

import Pagination from '../Pagination';

describe('Classic case: ', () => {
  // < 1 ... 4 [5] 6 ... 10 >
  it('render the page buttons', () => {
    const wrapper = shallow(<Pagination max={10} current={5} onClick={jest.fn()} />);
    const buttons = wrapper.find('.Pagination__button');
    expect(buttons.length).toBe(7);
    expect(
      buttons
        .at(0)
        .children()
        .text()
    ).toBe('1');
    expect(
      buttons
        .at(1)
        .children()
        .text()
    ).toBe('4');
    expect(
      buttons
        .at(2)
        .children()
        .text()
    ).toBe('5');
    expect(
      buttons
        .at(3)
        .children()
        .text()
    ).toBe('6');
    expect(
      buttons
        .at(4)
        .children()
        .text()
    ).toBe('10');
  });

  it('render current page', () => {
    const wrapper = shallow(<Pagination max={10} current={5} onClick={jest.fn()} />);
    const current = wrapper.find('.Pagination__button--current');
    expect(current.children().text()).toBe('5');
    expect(current.type()).toBe('div');
  });

  it('render ellispsis', () => {
    const wrapper = shallow(<Pagination max={10} current={5} onClick={jest.fn()} />);
    expect(wrapper.find('.Pagination__ellipsis').length).toBe(2);
  });
});

describe('onClick event: ', () => {
  // < 1 ... 4 [5] 6 ... 10 >
  it('clicking on page buttons', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination max={10} current={5} onClick={onClick} />);
    wrapper
      .find('.Pagination__button')
      .at(1)
      .simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(4);
  });

  it('clicking left arrow', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination max={10} current={5} onClick={onClick} />);
    wrapper
      .find('.Pagination__button--arrow')
      .first()
      .simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(4);
  });

  it('clicking right arrow', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<Pagination max={10} current={5} onClick={onClick} />);
    wrapper
      .find('.Pagination__button--arrow')
      .last()
      .simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(6);
  });
});

describe('Buttons edge cases: ', () => {
  it('render nothing if max === 0', () => {
    const wrapper = shallow(<Pagination max={0} current={5} onClick={jest.fn()} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('render nothing if max < 0', () => {
    const wrapper = shallow(<Pagination max={-5} current={5} onClick={jest.fn()} />);
    expect(wrapper.getElement()).toBe(null);
  });

  it('render current page 1 if current === 0', () => {
    const wrapper = shallow(<Pagination max={10} current={0} onClick={jest.fn()} />);
    expect(
      wrapper
        .find('.Pagination__button--current')
        .children()
        .text()
    ).toBe('1');
  });

  it('render current page 1 if current < 0', () => {
    const wrapper = shallow(<Pagination max={10} current={-1} onClick={jest.fn()} />);
    expect(
      wrapper
        .find('.Pagination__button--current')
        .children()
        .text()
    ).toBe('1');
  });

  it('render current page as max if current < max', () => {
    const wrapper = shallow(<Pagination max={10} current={20} onClick={jest.fn()} />);
    expect(
      wrapper
        .find('.Pagination__button--current')
        .children()
        .text()
    ).toBe('10');
  });
});

describe('Ellipsis edge cases: ', () => {
  it('0: < [1] 2 3 >', () => {
    const wrapper = shallow(<Pagination max={3} current={1} onClick={jest.fn()} />);
    expect(wrapper.find('.Pagination__ellipsis').length).toBe(0);
  });

  it('0: < 1 2 [3] 4 5 >', () => {
    const wrapper = shallow(<Pagination max={5} current={3} onClick={jest.fn()} />);
    expect(wrapper.find('.Pagination__ellipsis').length).toBe(0);
  });
});

describe('Arrows disabled state: ', () => {
  it('render arrows not disabled if 1 < current < max', () => {
    const wrapper = shallow(<Pagination max={10} current={5} onClick={jest.fn()} />);
    const arrows = wrapper.find('.Pagination__button--arrow');
    expect(arrows.length).toBe(2);
    expect(arrows.first().prop('disabled')).toBe(false);
    expect(arrows.last().prop('disabled')).toBe(false);
  });

  it('first disabled if current === 1', () => {
    const wrapper = shallow(<Pagination max={10} current={1} onClick={jest.fn()} />);
    expect(
      wrapper
        .find('.Pagination__button--arrow')
        .first()
        .prop('disabled')
    ).toBe(true);
  });

  it('last disabled if current === max', () => {
    const wrapper = shallow(<Pagination max={10} current={10} onClick={jest.fn()} />);
    expect(
      wrapper
        .find('.Pagination__button--arrow')
        .last()
        .prop('disabled')
    ).toBe(true);
  });
});
