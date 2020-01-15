import getBooleanProps from '../getBooleanProps';
import getSharedProps from '../getSharedProps';

jest.mock('../getSharedProps', () => jest.fn());
jest.mock('../../../../helpers', () => ({
  getTruthyValue: jest.fn().mockReturnValue('test'),
}));

describe('DatagridCellInput/DatagridCellInputAdapters/getBooleanProps', () => {
  it('shoud return default data', () => {
    expect(getBooleanProps()).toEqual({});
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
      context: { compact: 'small' },
      column: { title: 'label' },
      type: 9,
      value: 10,
      inputProps: { first: 1, second: 2 },
      handleChange: 'handleChange',
      handleKeyDown: 'handleKeyDown',
    };
    const {
      inputProps,
      handleChange: onChange,
      handleKeyDown: onKeyDown,
      ...props
    } = mock;

    expect(getBooleanProps(mock)).toEqual({ ...inputProps });
    expect(getSharedProps).toHaveBeenCalledWith(expect.objectContaining({
      ...props,
      onChange,
      onKeyDown,
    }));
  });
});
