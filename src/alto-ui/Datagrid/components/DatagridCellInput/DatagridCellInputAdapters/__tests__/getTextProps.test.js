import getTextProps from '../getTextProps';
import getSharedProps from '../getSharedProps';

jest.mock('../getSharedProps', () => jest.fn());
jest.mock('../../../../helpers', () => ({
  getTruthyValue: jest.fn().mockReturnValue('test'),
}));

describe('DatagridCellInput/DatagridCellInputAdapters/getTextProps', () => {
  it('shoud return default data', () => {
    expect(getTextProps()).toEqual({ type: 'text' });
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
      context: { compact: 'small', labels: 'labels', locale: 'pl' },
      column: {
        precision: 'precision',
        disableThousandSeparator: 'disableThousandSeparator',
        percent: 'percent',
        title: 'label',
      },
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
      handleBlur: onBlur,
      context,
      column,
      ...props
    } = mock;

    expect(getTextProps(mock)).toEqual({
      ...inputProps,
      type: 'text',
    });
    expect(getSharedProps).toHaveBeenCalledWith(expect.objectContaining({
      ...props,
      context,
      column,
      onBlur,
      onFocus,
      onChange,
      onKeyDown,
    }));
  });
});
