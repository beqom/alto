import getDateProps from '../getDateProps';
import getSharedProps from '../getSharedProps';

jest.mock('../getSharedProps', () => jest.fn());
jest.mock('../../../../helpers', () => ({
  getTruthyValue: jest.fn().mockReturnValue('test'),
}));

describe('DatagridCellInput/DatagridCellInputAdapters/getDateProps', () => {
  it('shoud return default data', () => {
    expect(getDateProps()).toEqual({
      labels: undefined,
      onClose: undefined,
      onSelectDate: undefined,
      right: true,
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
      inputProps: { first: 1, second: 2 },
      handleChange: 'handleChange',
      handleKeyDown: 'handleKeyDown',
      handleStartEditing: 'handleStartEditing',
      handleBlur: 'handleBlur',
      handleChangeFromOverlay: 'handleChangeFromOverlay',
    };
    const {
      inputProps,
      handleChange: onChange,
      handleKeyDown: onKeyDown,
      handleStartEditing: onFocus,
      handleBlur: onClose,
      handleChangeFromOverlay: onSelectDate,
      context: { labels },
      context,
      ...props
    } = mock;

    expect(getDateProps(mock)).toEqual({
      labels,
      onClose,
      onSelectDate,
      right: true,
      ...inputProps,
    });
    expect(getSharedProps).toHaveBeenCalledWith(expect.objectContaining({
      ...props,
      context,
      onFocus,
      onChange,
      onKeyDown,
    }));
  });
});
