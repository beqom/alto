import React from 'react';
import { shallow } from 'enzyme';

import DataGridHeaderCellContent from '../DatagridHeaderCellContent';
import ChevronUpIcon from '../../../../Icons/ChevronUp';
import ChevronDownIcon from '../../../../Icons/ChevronDown';
import FilterIcon from '../../../../Icons/Filter';

describe('DataGridHeaderCellContent component', () => {
  const props = {
    labels: {
      a11ySortLabel: 'title',
    },
    onSort: jest.fn(),
    sortDirection: 1,
    id: 'column',
    column: {
      key: '1',
      title: 'Column Title',
      sortDirection: 1,
      sortable: true,
    },
    style: {
      width: 200,
      minWidth: '2rem',
      maxWidth: 200,
    },
    wrapped: false,
    sorted: true,
  };
  describe('should render', () => {
    const notSortableProps = {
      context: {
        labels: {
          a11ySortLabel: 'title',
        },
      },
      column: {
        key: '1',
        title: 'Column Title',
        sortable: false,
      },
      style: {
        width: 200,
        minWidth: '2rem',
        maxWidth: 200,
      },
      wrapped: 2,
    };
    it('span with column title if there is no onSort and column is not sortable', () => {
      const wrapper = shallow(<DataGridHeaderCellContent {...notSortableProps} />);

      expect(
        wrapper
          .find('span')
          .first()
          .contains('Column Title')
      ).toBe(true);
    });
    it('span with column title if there is no onSort and column is not sortable', () => {
      const wrapper = shallow(<DataGridHeaderCellContent {...notSortableProps} />);

      expect(
        wrapper
          .find('span')
          .first()
          .prop('style')
      ).toEqual({ maxHeight: '2.4em' });
    });

    it('button with correct classNames', () => {
      const wrapper = shallow(<DataGridHeaderCellContent {...props} />);

      expect(wrapper.find('button').hasClass('DatagridHeaderCellContent')).toBe(true);
      expect(wrapper.find('button').hasClass('DatagridHeaderCellContent--button')).toBe(true);
    });

    it('button with correct id if there is id property in context prop', () => {
      const propsWithId = {
        ...props,
        context: {
          ...props.context,
          id: 'column',
        },
      };
      const wrapper = shallow(<DataGridHeaderCellContent {...propsWithId} />);

      expect(wrapper.find('#column__header-button--1')).toHaveLength(1);
    });

    it('chevronUp and chevronDown Icon', () => {
      const wrapper = shallow(<DataGridHeaderCellContent {...props} />);

      expect(wrapper.containsMatchingElement(<ChevronDownIcon />)).toBe(true);
      expect(wrapper.containsMatchingElement(<ChevronUpIcon />)).toBe(true);
    });
    it('filter icon if column is filtered', () => {
      const filteredColumnProps = {
        ...props,
        column: {
          ...props.column,
          filtered: true,
        },
      };
      const wrapper = shallow(<DataGridHeaderCellContent {...filteredColumnProps} />);

      expect(wrapper.containsMatchingElement(<FilterIcon />)).toBe(true);
    });
  });
  it('should call onSort function after click button', () => {
    const { onSort, column } = props;
    const wrapper = shallow(<DataGridHeaderCellContent {...props} />);

    wrapper.find('button').simulate('click');
    expect(onSort).toHaveBeenCalledWith(column);
  });
});
