import React from 'react';
import { shallow } from 'enzyme';
import DatagridCellInput from '../../DatagridCellInput/DatagridCellInput';
import DatagridCell from '../DatagridCell';

jest.mock('quill-mention', () => {});
jest.mock('react-quill', () => {
  const Editor = () => null;
  Editor.Quill = { register: jest.fn() };
  return Editor;
});
jest.mock('quill', () => () => {});

jest.mock('../../DatagridCellInput/DatagridCellInput', () => {
  // eslint-disable-next-line react/prop-types
  return ({ onStopEditing, onStartEditing, onChange }) => {
    return (
      <button
        id="DataGridCellInput"
        onBlur={() => onStopEditing()}
        onClick={() => onStartEditing()}
        onChange={onChange}
      />
    );
  };
});

jest.mock('../../../../Dropdown', () => {
  // eslint-disable-next-line react/prop-types
  return ({ id, context }) => (
    <button
      id={id}
      onClick={(...props) => context.onClickCellDropdownItem(...props)}
    />
  );
});

describe('DataGridCell', () => {
  const defaultProps = {
    column: {
      key: '1',
      title: 'fullname',
      cellDropdownItems: [{ key: '1', value: '1' }, { key: '2', value: '2' }],
    },
    context: {
      columns: [],
      showError: jest.fn(),
      modifiers: jest.fn(),
      parsers: {},
      onClickCellDropdownItem: jest.fn(),
      formatters: {},
      onChange: jest.fn(),
      visible: jest.fn(),
      tooltipVisible: jest.fn(),
      locale: 'en-US',
    },
    aria: {
      rowIndex: 1,
      colIndex: 1,
    },
    row: {
      '1': 1,
    },
  };

  const getWrapper = ({ ...props }) => shallow(<DatagridCell {...defaultProps} {...props} />);

  describe('default properties test', () => {
    it('should render wrapper with classname DataGridCell', () => {
      const wrapper = getWrapper();
      expect(wrapper.find('.DatagridCell')).toHaveLength(1);
      expect(wrapper.find('.DatagridCell__container')).toHaveLength(1);
    });

    it('should render component with additional className', () => {
      const wrapper = getWrapper({ className: 'test' });
      expect(wrapper.find('.DatagridCell').hasClass('test')).toBeTruthy();
    });

    it('should render component with default values', () => {
      const wrapper = getWrapper({ className: 'test' });
      const props = wrapper.props();
      expect(wrapper.hasClass('test')).toBeTruthy();
      const modifiers = {
        clickable: false,
        comfortable: false,
        compact: false,
        detached: false,
        disabled: false,
        editable: false,
        edited: false,
        header: false,
        lastRow: false,
        summary: false,
      };
      Object.keys(modifiers).forEach(key => {
        expect(props[key]).toBeFalsy();
      });
    });

    it('should pass good attributes to main element', () => {
      const wrapper = getWrapper();
      const defaultStyles = { width: 150, minWidth: '2rem', maxWidth: 150 };
      const { props: elementProps } = wrapper.getElement();
      expect(elementProps.title).toBe('');
      expect(elementProps['aria-rowindex']).toBe(1);
      expect(elementProps['aria-colindex']).toBe(1);
      expect(elementProps['aria-colindex']).toBe(1);
      expect(elementProps.role).toBe('gridcell');
      expect(elementProps.style).toEqual(defaultStyles);
      expect(wrapper.find('.DatagridCell').hasClass('DatagridCell--first')).toBeTruthy();
    });
  });
  describe('editable version', () => {
    const onStartEditing = jest.fn();
    const onStopEditing = jest.fn();
    const showError = jest.fn(() => 'Error');
    const onClickCellDropdownItem = jest.fn();

    const context = {
      ...defaultProps.context,
      columns: [{ key: '1' }],
      locale: 'en-US',
      renderers: {},
      onStartEditing,
      onStopEditing,
      onClickCellDropdownItem,
      showError,
      visible: jest.fn().mockReturnValue(true),
    };

    const wrapper = getWrapper({
      context,
      id: 'editable',
      editable: true,
    });

    it('should render button component when cell is editable', () => {
      const button = wrapper.find('#editable__button');
      expect(button).toHaveLength(1);
      expect(button.getElement().type).toBe('button');
    });

    it('should render input when cell is editable', () => {
      const input = wrapper.find('#editable__input');
      expect(input).toHaveLength(1);
    });

    it('should set editing when user click on cell button', () => {
      const button = wrapper.find('#editable__button');
      expect(button).toHaveLength(1);
      button.simulate('click');
      expect(wrapper.state().editing).toBeTruthy();
    });

    it('should call start editing function from context when user focus on input', () => {
      const input = wrapper.find(DatagridCellInput).dive();
      input.simulate('click');
      expect(onStartEditing).toHaveBeenCalledTimes(1);
      expect(wrapper.state().editing).toBeTruthy();
      input.simulate('blur');
      expect(onStopEditing).toHaveBeenCalledTimes(1);
      expect(wrapper.state().editing).toBeFalsy();
    });
    it('should display when wrong values are provided', () => {
      const input = wrapper.find(DatagridCellInput).dive();
      input.simulate('click');
      expect(showError).toHaveBeenCalled();
      expect(onStartEditing).toHaveBeenLastCalledWith(
        undefined,
        defaultProps.column,
        defaultProps.row,
        'Error'
      );
    });
    it('should set the value when user change something', () => {
      const input = wrapper.find(DatagridCellInput).dive();
      input.simulate('change', 'TEST');
      expect(wrapper.state().value).toBe('TEST');
    });

    it('should render dropdown when column contains dropdownItems', () => {
      const dropdown = wrapper.find('#editable__column-dropdown');
      expect(dropdown).toHaveLength(1);
    });

    it('should call cellDropdownItem from context when user click on dropdown item', () => {
      const dropdown = wrapper.find('#editable__column-dropdown');
      dropdown.simulate('click');
      expect(dropdown).toHaveLength(1);
      expect(onClickCellDropdownItem).toHaveBeenCalled();
    });
  });

  describe('version with render', () => {
    const listRenderer = jest.fn();
    const errorRenderer = jest.fn();
    const context = {
      ...defaultProps.context,
      visible: jest.fn().mockReturnValue(true),
      renderers: {
        list: listRenderer,
        error: errorRenderer,
      },
    };
    const render = jest.fn();

    it('should render only content when render function is passed to cell', () => {
      const wrapper = getWrapper({ render, context, id: 'editable' });

      expect(wrapper.find('.DatagridCell__content')).toHaveLength(1);
      expect(wrapper.find('#editable__input')).toHaveLength(0);
      expect(wrapper.find('#editable__column-dropdown')).toHaveLength(0);
    });

    it('should call specific renderers when there is no render function', () => {
      getWrapper({
        context,
        id: 'editable',
        inputProps: {
          a: 'a',
        },
        column: { key: '1', title: 'a', type: 'list' },
      });
      expect(listRenderer).toHaveBeenCalled();
      getWrapper({
        context,
        id: 'editable',
        inputProps: {
          a: 'a',
        },
        column: { key: '1', title: 'a', type: 'error' },
      });
      expect(errorRenderer).toHaveBeenCalled();
    });
  });
});
