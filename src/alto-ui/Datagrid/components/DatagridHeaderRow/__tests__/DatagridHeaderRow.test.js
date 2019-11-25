import React from 'react';
import { shallow } from 'enzyme';

import DatagridHeaderRow from '../DatagridHeaderRow';
import DatagridHeaderRowCheckbox from '../DatagridHeaderRowCheckbox';
import DatagridHeaderCell from '../../DatagridHeaderCell/DatagridHeaderCell';

describe('DatagridHeaderRow component', () => {
  const columns = [
    {
      key: '1',
      title: 'first',
    },
    {
      key: '2',
      title: 'second',
    },
    {
      key: '3',
      title: 'third',
    },
  ];

  const columnsWithChildren = columns.map(({ key, title }, index) =>
    index % 2 === 0
      ? {
          key,
          title,
          children: [
            { key: `${key}-child-1`, title: `${title}-child-1` },
            { key: `${key}-child-2`, title: `${title}-child-2` },
          ],
        }
      : { key, title, children: [{ key: `${key}-child`, title: `${title}-child`, editable: true }] }
  );

  const defaultProps = {
    columns,
    rowIndex: 0,
    columnIndexStart: 0,
    context: {
      columnHeaders: columns,
      labels: {
        a11ySortLabel: 'abcd',
        checkboxLabel: 'Checkbox',
        errorFormula: 'Error',
      },
      columnsWidth: { '2-child': 50 },
      columns: [
        {
          key: '1',
          title: 'first',
        },
        {
          key: '2',
          title: 'second',
        },
        {
          key: '3',
          title: 'third',
        },
      ],
    },
    hasCheckBox: false,
    frozen: false,
  };

  const propsWithChildren = {
    ...defaultProps,
    context: {
      ...defaultProps.context,
      columnHeaders: columnsWithChildren,
    },
    columns: columnsWithChildren,
  };

  const getWrapper = props => shallow(<DatagridHeaderRow {...defaultProps} {...props} />);

  it('should render row', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('.DatagridHeaderRow')).toHaveLength(1);
  });

  it('should not render checkbox if hasCheckbox prop is false', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(DatagridHeaderRowCheckbox)).toHaveLength(0);
  });

  it('should render checkbox if hasCheckbox prop is true', () => {
    const propsWithCheckbox = {
      ...defaultProps,
      hasCheckBox: true,
    };
    const wrapper = getWrapper(propsWithCheckbox);

    expect(wrapper.find(DatagridHeaderRowCheckbox)).toHaveLength(1);
  });

  it('should render three DatagridHeaderCell', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(DatagridHeaderCell)).toHaveLength(3);
  });

  it('should return null if column has children but it is empty array', () => {
    const updatedColumns = columns.map(column => ({ ...column, children: [] }));
    const updatedProps = {
      ...defaultProps,
      columns: updatedColumns,
    };
    const wrapper = getWrapper(updatedProps);

    expect(wrapper.find(DatagridHeaderCell)).toHaveLength(0);
  });

  it('should render row properly for columns with children', () => {
    const wrapper = getWrapper(propsWithChildren);

    expect(wrapper.find('.DatagridHeaderRow__group')).toHaveLength(3);
    expect(
      wrapper
        .find('.DatagridHeaderRow__group')
        .first()
        .hasClass('DatagridHeaderRow__group--first-in-row')
    ).toBe(true);
    expect(wrapper.find('.DatagridHeaderRow__group-title')).toHaveLength(3);
    expect(
      wrapper
        .find('.DatagridHeaderRow__group-title')
        .first()
        .prop('style')
    ).toEqual({ width: 300, maxWidth: 300 });
    expect(
      wrapper
        .find('.DatagridHeaderRow__group-title')
        .first()
        .text()
    ).toBe('first');
  });

  it('should properly render children columns in row', () => {
    const wrapper = getWrapper(propsWithChildren);

    expect(wrapper.find(DatagridHeaderCell)).toHaveLength(5);
    expect(
      wrapper
        .find(DatagridHeaderCell)
        .first()
        .prop('first')
    ).toBe(true);
    expect(
      wrapper
        .find(DatagridHeaderCell)
        .last()
        .prop('last')
    ).toBe(true);
  });

  it('should render properly rows with editable children', () => {
    const wrapper = getWrapper(propsWithChildren);

    expect(
      wrapper
        .find('.DatagridHeaderRow__group-title')
        .at(1)
        .prop('style')
    ).toEqual({ width: 74, maxWidth: 74 });
  });

  it('should render properly when one of column has no children', () => {
    const column = {
      key: '4',
      title: 'fourth',
    };
    const extendedPropsWithChildren = {
      ...defaultProps,
      context: {
        ...defaultProps.context,
        columnHeaders: [...columnsWithChildren, column],
      },
      columns: [...columnsWithChildren, column],
    };

    const wrapper = getWrapper(extendedPropsWithChildren);

    expect(wrapper.find(DatagridHeaderCell)).toHaveLength(6);
  });

  it('should render div with className DatagridHeaderRow__last-cell if frozen is false', () => {
    const wrapper = getWrapper();

    expect(wrapper.find('.DatagridHeaderRow__last-cell')).toHaveLength(1);
  });
});
