import getListProps from '../getListProps';
import getSharedProps from '../getSharedProps';

jest.mock('../getSharedProps', () => jest.fn());
jest.mock('../../../../helpers', () => ({
  getTruthyValue: jest.fn().mockReturnValue('test'),
}));

describe('DatagridCellInput/DatagridCellInputAdapters/getListProps', () => {
  it('shoud return default data', () => {
    expect(getListProps()).toEqual({
      clearable: true,
      edited: undefined,
      onClose: undefined,
      onOpen: undefined,
    });
  });

  it('shoud return corect data', () => {
    const mock = {
      id: 1,
      label: 2,
      onBlur: 3,
      onChange: 4,
      onFocus: 5,
      onKeyDown: 6,
      ref: 7,
      context: { compact: 'small', labels: 'labels' },
      column: { title: 'label' },
      type: 9,
      value: 10,
      modifiers: { edited: 'abc', test: 'test' },
      inputProps: { first: 1, second: 2 },
      handleChange: 'handleChange',
      handleKeyDown: 'handleKeyDown',
      handleStartEditing: 'handleStartEditing',
      handleBlur: 'handleBlur',
      handleChangeFromOverlay: 'handleChangeFromOverlay',
    };
    const {
      inputProps,
      handleChange,
      handleKeyDown: onKeyDown,
      handleKeyDown,
      handleStartEditing: onOpen,
      handleBlur: onClose,
      handleChangeFromOverlay: onChange,
      modifiers: { edited },
      modifiers,
      ...props
    } = mock;

    expect(getListProps(mock)).toEqual({
      onOpen,
      onClose,
      clearable: true,
      edited,
      ...inputProps,
    });
    expect(getSharedProps).toHaveBeenCalledWith(expect.objectContaining({
      ...props,
      onChange,
      onKeyDown,
      handleChange,
      modifiers,
    }));
  });
});
