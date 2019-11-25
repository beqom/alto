import React from 'react';
import { shallow, mount } from 'enzyme';
import Datagrid from '../Datagrid';

import DatagridResizer from '../components/DatagridResizer';
import DatagridHeaderRow from '../components/DatagridHeaderRow';
import DatagridRow from '../components/DatagridRow';

jest.mock('../../Icons/ErrorIcon', () => () => null);
jest.mock('../../Avatar', () => () => null);
jest.mock('../../Form/CheckBox', () => () => null);
jest.mock('../../Tooltip', () => () => null);

jest.mock('../components/DatagridHeaderRow', () => () => null);
jest.mock('../components/DatagridGroupedRow', () => () => null);
jest.mock('../components/DatagridRow', () => () => null);
jest.mock('../components/DatagridResizer', () => () => null);

describe('Datagrid', () => {
  const defaultProps = {
    id: 'test-id',
    columns: [],
    rows: [],
    rowKeyField: jest.fn('key'),
  };

  const getWrapper = props => shallow(<Datagrid {...defaultProps} {...props} />);
  const getMountedWrapper = props => mount(<Datagrid {...defaultProps} {...props} />);
  const getCols = (plain = 1, frozen = 0) => {
    return [
      ...Array(plain).fill(null).map((trash, i) => ({ key: `key-${i}`, title: `title-${i}` })),
      ...Array(frozen).fill(null).map((trash, i) => ({ key: `key-frozen-${i}`, title: `title-frozen-${i}`, frozen: true })),
    ];
  };

  it('should render it self', () => {
   const wrapper = getWrapper();

   expect(wrapper.find({ className: 'Datagrid' })).toHaveLength(1);
  });

  describe('Render only necessary components for empty cols and rows', () => {
    const wrapper = getWrapper();

    it('should not render .Datagrid__header-row--frozen ( frozen header rows wrapper )', () => {
      expect(wrapper.find('.Datagrid__header-row--frozen')).toHaveLength(0);
    });

    it('should have "no data" message', () => {
      expect(wrapper.find('.Datagrid__no-data-label')).toHaveLength(1);
    });
  });

  describe('resizer', () => {
    const expectedProps = {
      handleHeight: 0,
      height: 0,
      left: 0,
      maxLeft: 64,
      maxRight: 0,
      onStart: expect.any(Function),
      onStop: expect.any(Function),
      resizing: false,
      top: 0,
    };

    it('should have <DatagridResizer /> with default props', () => {
      const wrapper = getWrapper(expectedProps);
      const datagridResizer = wrapper.find(DatagridResizer);

      expect(datagridResizer).toHaveLength(1);
      expect(datagridResizer.props()).toEqual(expectedProps);
    });

    describe('state manipulation tests', () => {
      const wrapper = getWrapper();

      const newStateData = {
        resizer: {
          target: {
            height: 10,
            left: 5,
            top: 1,
          },
          container: {
            bottom: 6,
            right: 55,
          },
          parent: {
            left: 26,
          },
          column: {
            editable: true,
          },
          resizing: null,
        },
      };

      const {
        resizer: { column },
        resizer,
      } = newStateData;

      const result = {
        ...expectedProps,
        handleHeight: 10,
        left: 5,
        maxRight: 55,
        maxLeft: 100,
        resizing: null,
        top: 1,
        height: 5,
      };

      it('should past correct props for <DatagridResizer /> on state different from defaults', () => {
        wrapper.setState(newStateData);

        expect(wrapper.find(DatagridResizer).props()).toEqual(result);

        wrapper.setState({
          ...newStateData,
          resizer: {
            ...resizer,
            column: {
              ...column,
              frozen: true,
            },
          },
        });

        expect(wrapper.find(DatagridResizer).props()).toEqual({
          ...result,
          maxRight: -19,
        });
      });

      it('should past correct props for <DatagridResizer /> on state change', () => {
        wrapper.setState({
          ...newStateData,
          resizer: {
            ...resizer,
            column: {
              ...column,
              frozen: true,
            },
          },
        });

        expect(wrapper.find(DatagridResizer).props()).toEqual({
          ...result,
          maxRight: -19,
        });
      });
    });
  });

  describe('header rows', () => {
    const expectedProps = {
      columnIndexStart: 0,
      columns: [],
      context: expect.any(Object),
      frozen: false,
      hasCheckBox: false,
      rowIndex: 1,
    };

    const expectProps = wrapper => {
      const datagridHeaderRows = wrapper.find(DatagridHeaderRow);

      expect(datagridHeaderRows).toHaveLength(2);
      expect(datagridHeaderRows.first().props()).toEqual({
        ...expectedProps,
        hasCheckBox: true,
        frozen: true,
      });
      expect(datagridHeaderRows.last().props()).toEqual(expectedProps);
    };

    it('should have <DatagridHeaderRow /> only for non frozen columns with default props', () => {
      const datagridHeaderRow = getWrapper().find(DatagridHeaderRow);

      expect(datagridHeaderRow).toHaveLength(1);
      expect(datagridHeaderRow.props()).toEqual(expectedProps);
    });

    it('should have two <DatagridHeaderRow /> and past correct props if initial props are different from defaults', () => {
      const wrapper = getWrapper({ onSelectRow: jest.fn() });

      expectProps(wrapper);
    });

    it('should react on props change', () => {
      const wrapper = getWrapper();
      wrapper.setProps({ onSelectRow: jest.fn() });

      expectProps(wrapper);
    });
  });

  describe('Summary row ( todo - fix double incrementation )', () => {
    const columns = getCols();
    const renderSummaryCell = jest.fn();
    const expectedProps = {
      columns,
      index: 0,
      header: true,
      summary: true,
      rowIndex: 3, // todo - fix double incrementation
      context: expect.any(Object),
      render: renderSummaryCell,
      columnIndexStart: 0,
      frozen: false,
      detached: true,
      lastRow: true,
      children: expect.any(Function),
    };

    const expectNonFrozenProps = wrapper => {
      expect(wrapper.find(DatagridRow)).toHaveLength(1);
      expect(wrapper.find(DatagridRow).props()).toEqual(expectedProps);
    };

    it('should not render <DatagridRow /> for defaults', () => {
      const wrapper = getWrapper();

      expect(wrapper.find(DatagridRow)).toHaveLength(0);
    });

    it('should not render for non frozen cols on falsy renderSummaryCell', () => {
      const wrapper = getWrapper({ columns });

      expect(wrapper.find(DatagridRow)).toHaveLength(0);
    });

    it('should render for non frozen cols on truthy renderSummaryCell', () => {
      expectNonFrozenProps(getWrapper({ renderSummaryCell, columns }));
    });

    describe('props reactive', () => {
      const wrapper = getWrapper({ columns });
      const multipleColumns = getCols(5, 6);

      it('should react on change renderSummaryCell prop', () => {
        wrapper.setProps({ renderSummaryCell });
        expectNonFrozenProps(wrapper);
      });

      it('should react on change frozen num of columns', () => {
        wrapper.setProps({ columns: multipleColumns });
        const datagridRow = wrapper.find(DatagridRow);

        const frozenColumns = multipleColumns.filter(({ frozen }) => frozen);
        const plainColumns = multipleColumns.filter(({ frozen }) => !frozen);

        expect(datagridRow).toHaveLength(2);
        expect(datagridRow.first().props()).toEqual({
          ...expectedProps,
          columns: frozenColumns,
          frozen: true,
        });
        expect(datagridRow.last().props()).toEqual({
          ...expectedProps,
          columns: plainColumns,
          columnIndexStart: frozenColumns.length,
        });
      });
    });
  });

  describe('Scrolling ( todo - create and test separate component )', () => {
    const getContainer = wrapper => wrapper.find('.Datagrid__horizontal-scroll-container');
    const getMountedWrapperWithRows = () => getMountedWrapper({
      rowKeyField: () => 'key',
      columns: getCols(3, 4).map(col => ({ ...col, width: 5 })),
      rows: [{}],
    });
    const wrapper = getMountedWrapperWithRows();
    const scrollLeft = 333;

    const emitEvent = (containerWrapper, eventName, valueObject) => {
      const containerNode = containerWrapper.getDOMNode();
      const [valueKey] = Object.keys(valueObject);
      containerNode[valueKey] = valueObject[valueKey];
      const currentEvent = document.createEvent('UIEvents');
      currentEvent.initUIEvent(eventName, true, true, window, 1);
      containerNode.dispatchEvent(currentEvent);
    }

    it('should have no scrollbars on default', () => {
      expect(getContainer(getWrapper())).toHaveLength(0);
    });

    it('should be rendered if has width', () => {
      expect(getContainer(wrapper)).toHaveLength(1);
    });

    it('should listen on container node', () => {
      const currentWrapper = getMountedWrapperWithRows();
      const container = getContainer(currentWrapper);

      expect(currentWrapper.find('.Datagrid__rows-container').getDOMNode().scrollLeft).toBe(0);
      expect(currentWrapper.find('.Datagrid__header-row-container').getDOMNode().scrollLeft).toBe(0);

      emitEvent(container, 'scroll', { scrollLeft });

      expect(currentWrapper.find('.Datagrid__rows-container').getDOMNode().scrollLeft).toBe(scrollLeft);
      expect(currentWrapper.find('.Datagrid__header-row-container').getDOMNode().scrollLeft).toBe(scrollLeft);
    });

    it('should use other listener for MacOSX', () => {
      jest.spyOn(window.navigator, 'appVersion', 'get').mockReturnValue('Mac');
      jest.clearAllMocks();

      const currentWrapper = getMountedWrapperWithRows();
      const scrollableComponent = currentWrapper.find('.Datagrid__rows-container--isMacOS');

      expect(scrollableComponent).toHaveLength(1);

      emitEvent(scrollableComponent, 'scroll', { scrollLeft });

      expect(currentWrapper.find('.Datagrid__header-row-container').getDOMNode().scrollLeft).toBe(scrollLeft);
    });
  });
});
