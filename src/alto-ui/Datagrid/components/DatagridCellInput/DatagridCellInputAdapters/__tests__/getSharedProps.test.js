import getSharedProps from '../getSharedProps';

jest.mock('../../../../helpers', () => ({
  getTruthyValue: jest.fn().mockReturnValue('test'),
}));

describe('DatagridCellInput/DatagridCellInputAdapters/getSharedProps', () => {
  it('shoud return default data', () => {
    const expected = {
      hideLabel: true,
      id: undefined,
      label: undefined,
      onBlur: undefined,
      onChange: undefined,
      onFocus: undefined,
      onKeyDown: undefined,
      ref: undefined,
      small: undefined,
      type: undefined,
      value: 'test',
    };

    expect(getSharedProps()).toEqual(expected);
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
    };
    const { context, column, ...expected } = mock;

    expect(getSharedProps(mock)).toEqual({
      ...expected,
      hideLabel: true,
      small: 'small',
      label: 'label',
      value: 'test',
    });
  });
});
