import React from 'react';
import { mount } from 'enzyme';
import DatagridCellInput from '../DatagridCellInput';

jest.mock('../../../../Input', () => {
  const { forwardRef } = jest.requireActual('react');

  return forwardRef((props, ref) => {
    const {
      hideLabel,
      clearable,
      onStopEditing,
      onOpen,
      right,
      disableThousandSeparator,
      onSelectDate,
      ...allowedProps
    } = props;

    return (
      <input
        ref={ref}
        {...allowedProps}
      />
    );
  });
});


describe('DatagridCellInput', () => {
  const ENTER_KEY_CODE = 13;
  const ESC_KEY_CODE = 27;

  const testId = 'testId';
  const propsMock = {
    id: testId,
    context: {
      locale: 'pl',
    },
    column: {
      title: 'test-title',
    },
    onChange: () => jest.fn(),
    onStopEditing: () => jest.fn(),
    onStartEditing: () => jest.fn(),
    modifiers: {},
    type: '',
    editing: false,
  };
  const firstMockValue = { value: 'mockedData1' };
  const secondMockValue = { value: 'mockedData2' };

  const getWrapper = props => mount(<DatagridCellInput {...propsMock} {...props} />);


  it('should mount input', () => {
    const input = getWrapper().find('input');

    expect(input).toHaveLength(1);
    expect(input.prop('id')).toBe(testId);
    expect(input.prop('type')).toBe('text');
  });

  it('should be focusable on set editing prop as true', () => {
    const wrapper = getWrapper();

    expect(wrapper.getDOMNode()).not.toEqual(document.activeElement);
    wrapper.setProps({ editing: true });
    expect(wrapper.getDOMNode()).toEqual(document.activeElement);
  });

  it('should have modifiers', () => {
    const modifiersMockName = 'testmock';
    const wrapper = getWrapper({ modifiers: { [modifiersMockName]: true } });

    expect(wrapper.find('input').prop('className')).toContain(`--${modifiersMockName}`);
  });

  describe('hanle events', () => {
    it('should handle onChange event', () => {
      const onChange = jest.fn();
      const wrapper = getWrapper({ onChange });

      wrapper.simulate('change', firstMockValue);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ ...firstMockValue }));

      wrapper.simulate('change', secondMockValue);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ ...secondMockValue }));

      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it('should handle onBlur event', () => {
      const onBlur = jest.fn();
      const wrapper = getWrapper({
        onStopEditing: onBlur,
        value: 'mockedValue1',
      });

      wrapper.simulate('blur');
      expect(onBlur).toHaveBeenCalledWith('mockedValue1');

      wrapper.setProps({ value: 'mockedValue2' });
      wrapper.simulate('blur');
      expect(onBlur).toHaveBeenCalledWith('mockedValue2');

      expect(onBlur).toHaveBeenCalledTimes(2);
    });

    it('should handle handleChangeFromOverlay event', () => {
      const onStopEditing = jest.fn();
      const onChange = jest.fn();
      const props = {
        onChange,
        onStopEditing,
        type: 'select',
      };
      const wrapper = getWrapper(props);

      wrapper.simulate('change', firstMockValue);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ ...firstMockValue }));
      expect(onStopEditing).toHaveBeenCalledWith(expect.objectContaining({ ...firstMockValue }));


      wrapper.simulate('change', secondMockValue);
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ ...secondMockValue }));
      expect(onStopEditing).toHaveBeenCalledWith(expect.objectContaining({ ...secondMockValue }));

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onStopEditing).toHaveBeenCalledTimes(2);
    });

    it('should handle onStartEditing event', () => {
      const onStartEditing = jest.fn();
      const wrapper = getWrapper({
        onStartEditing,
        value: 'mockedValue1',
      });

      wrapper.simulate('focus');
      expect(onStartEditing).toHaveBeenCalledWith('mockedValue1');

      wrapper.setProps({ value: 'mockedValue2' });
      wrapper.simulate('focus');
      expect(onStartEditing).toHaveBeenCalledWith('mockedValue2');

      expect(onStartEditing).toHaveBeenCalledTimes(2);
    });

    it('should handle handleKeyDown event', () => {
      const onStopEditing = jest.fn();
      const wrapper = getWrapper({
        onStopEditing,
        value: 'mockedValue1',
      });

      wrapper.simulate('keyDown');
      wrapper.simulate('keyDown', { keyCode: 2 });
      wrapper.simulate('keyDown', { keyCode: null });
      wrapper.simulate('keyDown', { keyCode: ENTER_KEY_CODE });
      wrapper.simulate('keyDown', { keyCode: ENTER_KEY_CODE });
      wrapper.simulate('keyDown', { keyCode: ESC_KEY_CODE });
      wrapper.simulate('keyDown', { keyCode: ESC_KEY_CODE });

      expect(onStopEditing).toHaveBeenCalledTimes(4);
    });
  });

  describe('Check passed props', () => {
    const getPropsWithoutUndefined = wrapper => {
      const props = wrapper.find('input').props();

      return Object.keys(props).reduce((acc, key) => {
        const prop = props[key];
        if (typeof prop === 'undefined') {
          return acc;
        }

        return {
          ...acc,
          [key]: prop,
        };
      }, {});
    };

    const expectChangeInputProps = wrapper => {
      const onKeyDown = jest.fn();
        const onChange = jest.fn();
        const onClose = jest.fn();
        const onBlur = jest.fn();
        wrapper.setProps({
          inputProps: {
            onKeyDown,
            onChange,
            onClose,
            onBlur,
            value: 'abc',
          },
        });
        const input = wrapper.find('input');

        expect(input.prop('value')).toBe('abc');

        input.simulate('keyDown', { keyCode: ESC_KEY_CODE });
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        input.simulate('change');
        expect(onChange).toHaveBeenCalledTimes(1);
        input.simulate('close');
        expect(onClose).toHaveBeenCalledTimes(1);
        input.simulate('blur');
        expect(onBlur).toHaveBeenCalledTimes(1);
    };

    describe('list && select types', () => {
      const wrapper = getWrapper();
      const {
        id,
        column: {
          title: label,
        },
      } = propsMock;

      const expected = {
        id,
        label,
        type: 'list',
        onKeyDown: expect.any(Function),
        onChange: expect.any(Function),
        onClose: expect.any(Function),
        className: expect.any(String),
        value: '',
      };

      beforeEach(() => {
        wrapper.setProps({ type: 'list' });
      });

      it('should have correct initial props for list and select', () => {
        expect(getPropsWithoutUndefined(wrapper)).toEqual(expected);

        wrapper.setProps({ type: 'select' });
        expect(getPropsWithoutUndefined(wrapper)).toEqual({
          ...expected,
          type: 'select',
        });
      });

      it('should insert modifiers prop', () => {
        wrapper.setProps({
          modifiers: {
            edited: 'edited',
          },
        });

        expect(getPropsWithoutUndefined(wrapper)).toEqual({
          ...expected,
          edited: 'edited',
        });
      });

      it('should insert additional inputProps', () => {
        expectChangeInputProps(wrapper);
      });
    });

    describe('boolean type', () => {
      const wrapper = getWrapper();
      const {
        id,
        column: {
          title: label,
        },
      } = propsMock;

      const expected = {
        id,
        label,
        type: 'boolean',
        onKeyDown: expect.any(Function),
        onChange: expect.any(Function),
        className: expect.any(String),
        value: '',
      };

      beforeEach(() => {
        wrapper.setProps({ type: 'boolean' });
      });

      it('should insert correct props', () => {
        expect(getPropsWithoutUndefined(wrapper)).toEqual(expected);
      });

      it('should insert additional inputProps', () => {
        expectChangeInputProps(wrapper);
      });
    });

    describe('number && integer && float types', () => {
      const wrapper = getWrapper();
      const {
        id,
        column: {
          title: label,
        },
      } = propsMock;

      const expected = {
        id,
        label,
        type: 'number',
        onBlur: expect.any(Function),
        onFocus: expect.any(Function),
        onKeyDown: expect.any(Function),
        onChange: expect.any(Function),
        className: expect.any(String),
        locale: 'pl',
        value: '',
      };

      beforeEach(() => {
        wrapper.setProps({ type: 'number' });
      });

      it('should insert correct props', () => {
        expect(getPropsWithoutUndefined(wrapper)).toEqual(expected);
        wrapper.setProps({ type: 'integer' });
        expect(getPropsWithoutUndefined(wrapper)).toEqual({ ...expected, type: 'integer' });
        wrapper.setProps({ type: 'float', value: 'abc' });
        expect(getPropsWithoutUndefined(wrapper)).toEqual({ ...expected, type: 'float', value: 'abc' });
      });

      it('should insert additional inputProps', () => {
        expectChangeInputProps(wrapper);
      });
    });

    describe('date && datetime types', () => {
      const wrapper = getWrapper();
      const {
        id,
        column: {
          title: label,
        },
      } = propsMock;

      const expected = {
        id,
        label,
        type: 'date',
        onClose: expect.any(Function),
        onFocus: expect.any(Function),
        onKeyDown: expect.any(Function),
        onChange: expect.any(Function),
        className: expect.any(String),
        value: '',
      };

      beforeEach(() => {
        wrapper.setProps({ type: 'date' });
      });

      it('should insert correct props', () => {
        expect(getPropsWithoutUndefined(wrapper)).toEqual(expected);
        wrapper.setProps({ type: 'datetime' });
        expect(getPropsWithoutUndefined(wrapper)).toEqual({ ...expected, type: 'datetime' });
        wrapper.setProps({ value: 'ooo' });
        expect(getPropsWithoutUndefined(wrapper)).toEqual({ ...expected, type: 'datetime', value: 'ooo' });
      });

      it('should insert additional inputProps', () => {
        expectChangeInputProps(wrapper);
      });
    });
  });
});
