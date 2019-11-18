import React from 'react';
import { shallow } from 'enzyme';

import DatagridHeaderCell from '../DatagridHeaderCell';
import DataGridHeaderCellContent from '../DatagridHeaderCellContent';

describe('DatagridHeaderCell component', () => {
  const props = {
    context: {
      labels: {
        a11ySortLabel: 'title',
      },
      onMouseEnterResizeHandle: jest.fn(),
      wrapHeader: true,
      onSort: jest.fn(),
    },
    column: {
      key: '1',
      title: 'Column Title',
      editable: false,
      sortDirection: 1,
      sortable: true,
    },
    rowIndex: 1,
    colIndex: 1,
    width: 200,
  };
  describe('should render', () => {
    it('<DataGridHeaderCellContent />', () => {
      const wrapper = shallow(<DatagridHeaderCell {...props} />);

      expect(wrapper.containsMatchingElement(<DataGridHeaderCellContent />)).toBe(true);
    });

    it('div with className DatagridHeaderCell__resize-handle', () => {
      const wrapper = shallow(<DatagridHeaderCell {...props} />);

      expect(wrapper.find('.DatagridHeaderCell__resize-handle')).toHaveLength(1);
    });
  });
  describe('should pass correct props', () => {
    it('to DataGridHeaderCellContent if column is not editable', () => {
      const wrapper = shallow(<DatagridHeaderCell {...props} />);
      const style = {
        width: 200,
        minWidth: '2rem',
        maxWidth: 200,
      };
      const { context, column } = props;

      expect(wrapper.find(DataGridHeaderCellContent).prop('style')).toEqual(style);
      expect(wrapper.find(DataGridHeaderCellContent).prop('sorted')).toBe(true);
      expect(wrapper.find(DataGridHeaderCellContent).prop('wrapped')).toBe(true);
      expect(wrapper.find(DataGridHeaderCellContent).prop('style')).toEqual(style);
      expect(wrapper.find(DataGridHeaderCellContent).prop('context')).toEqual(context);
      expect(wrapper.find(DataGridHeaderCellContent).prop('column')).toEqual(column);
    });

    it('to DataGridHeaderCellContent if column is editable', () => {
      const editableColumnProps = {
        ...props,
        column: {
          ...props.column,
          editable: true,
        },
      };
      const style = {
        width: 200,
        minWidth: '4.625rem',
        maxWidth: 200,
      };

      const wrapper = shallow(<DatagridHeaderCell {...editableColumnProps} />);

      expect(wrapper.find(DataGridHeaderCellContent).prop('style')).toEqual(style);
    });

    it('to .DatagridHeaderCell__resize-handle', () => {
      const wrapper = shallow(<DatagridHeaderCell {...props} />);
      const {
        context: { onMouseEnterResizeHandle },
      } = props;

      expect(typeof wrapper.find('.DatagridHeaderCell__resize-handle').prop('onMouseEnter')).toBe(
        'function'
      );

      wrapper.find('.DatagridHeaderCell__resize-handle').simulate('mouseEnter');
      expect(onMouseEnterResizeHandle).toHaveBeenCalled();
    });
  });

  describe('it should rerender component if props change', () => {
    it('width prop', () => {
      const wrapper = shallow(<DatagridHeaderCell {...props} />);
      wrapper.setProps({ width: 400 });

      expect(wrapper.prop('style')).toEqual({ minWidth: '2rem', width: 400, maxWidth: 400 });
    });

    it('colIndex prop', () => {
      const wrapper = shallow(<DatagridHeaderCell {...props} />);
      wrapper.setProps({ colIndex: 2 });

      expect(wrapper.prop('aria-colindex')).toBe(2);
    });
    it('rowIndex prop', () => {
      const wrapper = shallow(<DatagridHeaderCell {...props} />);
      wrapper.setProps({ rowIndex: 2 });

      expect(wrapper.prop('aria-rowindex')).toBe(2);
    });

    it('last prop', () => {
      const wrapper = shallow(<DatagridHeaderCell {...props} />);
      wrapper.setProps({ last: true });

      expect(wrapper.hasClass('DatagridHeaderCell--last')).toBe(true);
    });

    it('column prop', () => {
      const wrapper = shallow(<DatagridHeaderCell {...props} />);
      wrapper.setProps({
        column: {
          key: '1',
          title: 'Column Title',
          editable: false,
          sortable: true,
        },
      });

      expect(wrapper.hasClass('DatagridHeaderCell--sorted')).toBe(false);
    });
  });
});
