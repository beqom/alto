import React from 'react';
import { shallow } from 'enzyme';

import DatagridHeaderRowCheckbox from '../DatagridHeaderRowCheckbox';
import Checkbox from '../../../../Form/CheckBox';

describe('DatagridHeaderRowCheckbox component', () => {
  const defaultProps = {
    context: {
      columnHeaders: [],
      labels: {
        checkboxLabel: 'abcd',
      },
      id: '123',
      onSelectAllRows: jest.fn(),
      isDisplayedRowsSelected: false,
    },
    columns: [
      {
        id: '123',
      },
    ],
  };

  const getWrapper = props => shallow(<DatagridHeaderRowCheckbox {...defaultProps} {...props} />);

  it('should render Checkbox component', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(Checkbox)).toHaveLength(1);
  });

  it('should render correct checkbox label', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(Checkbox).prop('label')).toBe('abcd');
  });

  it('should render unchecked Checkbox', () => {
    const wrapper = getWrapper();

    expect(wrapper.find(Checkbox).prop('checked')).toBe(false);
  });

  it('should render unchecked Checkbox', () => {
    const updatedProps = {
      ...defaultProps,
      context: {
        ...defaultProps.context,
        isDisplayedRowsSelected: true,
      },
    };
    const wrapper = getWrapper(updatedProps);

    expect(wrapper.find(Checkbox).prop('checked')).toBe(true);
  });

  it('should call onSelectAllRows funtion after click', () => {
    const {
      context: { onSelectAllRows },
    } = defaultProps;
    const wrapper = getWrapper();

    wrapper.find(Checkbox).simulate('change');

    expect(onSelectAllRows).toHaveBeenCalled();
  });

  it('should render if there is column with children', () => {
    const columnHeaders = [
      {
        title: 'abcd',
        children: [
          {
            id: '456',
            title: 'efgh',
          },
        ],
      },
    ];
    const propsWithChildren = {
      ...defaultProps,
      context: {
        ...defaultProps.context,
        columnHeaders,
      },
    };
    const wrapper = getWrapper(propsWithChildren);

    expect(wrapper.find(Checkbox)).toHaveLength(1);
    expect(wrapper.find('.DatagridHeaderRow__group')).toHaveLength(1);
    expect(wrapper.find('.DatagridHeaderRow__group-columns')).toHaveLength(1);
    expect(wrapper.find('.DatagridHeaderRow__checkbox-container')).toHaveLength(1);
  });

  it('should not break when there is no columnsHeaders in context prop', () => {
    const {
      context: { columnHeaders, ...updatedContext },
    } = defaultProps;
    const updatedProps = {
      ...defaultProps,
      context: updatedContext,
    };
    const wrapper = getWrapper(updatedProps);

    expect(wrapper.find(Checkbox)).toHaveLength(1);
  });
});
