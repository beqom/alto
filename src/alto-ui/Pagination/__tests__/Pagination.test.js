import React from 'react';
import { shallow, mount } from 'enzyme';

import Pagination from '../Pagination';

describe('Pagination Component', () => {
  describe('should render', () => {
    // < 1-10 of 10 >
    it('items range', () => {
      const wrapper = shallow(
        <Pagination id="Test" currentPage={1} totalRecords={10} pageSize={5} onChange={jest.fn()} />
      );
      const range = wrapper.find('.Pagination__range-items');
      expect(range.first().text()).toBe('1-5');
    });

    it('of totalRecords', () => {
      const wrapper = shallow(
        <Pagination id="Test" currentPage={1} totalRecords={10} pageSize={5} onChange={jest.fn()} />
      );
      const total = wrapper.find('.Pagination__range-total');
      expect(total.first().text()).toBe('of 10');
    });
    // < 41-48 of 48 >
    it('proper range if last page is not full pageSize', () => {
      const wrapper = shallow(
        <Pagination id="Test" onChange={jest.fn()} currentPage={5} pageSize={10} totalRecords={48} />
      );
      const range = wrapper.find('.Pagination__range-items');
      const ofTotal = wrapper.find('.Pagination__range-total');
      expect(range.first().text()).toBe('41-48');
      expect(ofTotal.first().text()).toBe('of 48');
    });
    it('nothing when there is no elements', () => {
      const wrapper = shallow(
        <Pagination id="Test" currentPage={1} totalRecords={0} pageSize={5} onChange={jest.fn()} />
      );
      expect(wrapper.getElement()).toBe(null);
    });

    it('render pagination with default pageSize', () => {
      const wrapper = shallow(<Pagination id="Test" currentPage={1} totalRecords={30} onChange={jest.fn()} />);
      const range = wrapper.find('.Pagination__range-items');
      expect(range.first().text()).toBe('1-10');
    });

    it('render proper range even current page is wrong', () => {
      const wrapper = shallow(
        <Pagination id="Test" currentPage={144} totalRecords={40} pageSize={10} onChange={jest.fn()} />
      );
      const range = wrapper.find('.Pagination__range-items');
      expect(range.first().text()).toBe('31-40');
    });
  });

  describe('onChange event: ', () => {
    // < 1-5 of 20 >
    it('clicking on prev page', () => {
      const onClick = jest.fn();
      const wrapper = shallow(
        <Pagination pageSize={5} totalRecords={20} currentPage={2} id="Test" onChange={onClick} />
      );
      wrapper
        .find('#Test__arrow--prev')
        .first()
        .simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(1);
    });

    it('clicking on next page', () => {
      const onClick = jest.fn();
      const wrapper = shallow(
        <Pagination totalRecords={100} currentPage={3} id="Test" onChange={onClick} />
      );
      wrapper
        .find('#Test__arrow--next')
        .first()
        .simulate('click');
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(4);
    });
  });

  describe('Arrows', () => {
    it('disabled prev arrow when currentPage is 1 ', () => {
      const wrapper = shallow(
        <Pagination onChange={jest.fn()} currentPage={1} id="Test" pageSize={10} totalRecords={48} />
      );
      const prev = wrapper.find('#Test__arrow--prev');
      expect(prev.prop('disabled')).toBe(true);
    });

    it('disabled next arrow when currentPage === last page', () => {
      const wrapper = shallow(
        <Pagination onChange={jest.fn()} currentPage={5} id="Test" pageSize={10} totalRecords={50} />
      );
      const next = wrapper.find('#Test__arrow--next');
      expect(next.prop('disabled')).toBe(true);
    });
    it('click prev arrow should be disabled', () => {
      const onClick = jest.fn();
      const wrapper = mount(
        <Pagination pageSize={5} totalRecords={20} currentPage={1} id="Test" onChange={onClick} />
      );
      wrapper
        .find('#Test__arrow--prev')
        .first()
        .simulate('click');
      expect(onClick).toHaveBeenCalledTimes(0);
    });
    it('click next arrow should be disabled when current === last', () => {
      const onClick = jest.fn();
      const wrapper = mount(
        <Pagination pageSize={5} totalRecords={20} currentPage={4} id="Test" onChange={onClick} />
      );
      wrapper
        .find('#Test__arrow--next')
        .first()
        .simulate('click');
      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });
});
