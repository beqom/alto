import React from 'react';
import { shallow } from 'enzyme';
import DatagridCellError from '../components/DatagridCellError';

describe('DatagridCellError', () => {
  const showError = jest.fn(val => () => val);
  const isWarningError = jest.fn(val => () => val);
  const replaceRowValues = jest.fn().mockReturnValue('Replaced');

  const defaultProps = {
    column: { key: 1, title: 'title' },
    row: { 1: '1' },
    value: 'aa',
  };

  const getWrapper = ({ ...props }) => shallow(<DatagridCellError {...defaultProps} {...props} />);

  it('should return null values when there is no showError function', () => {
    expect(getWrapper().getElement()).toBeNull();
  });

  it('should call showError function when is passed', () => {
    getWrapper({ showError: showError(false) });
    expect(showError).toHaveBeenCalledTimes(1);
  });

  it('should call is warning when is passed', () => {
    getWrapper({ isWarningError, showError: showError(true), replaceRowValues });
    expect(isWarningError).toHaveBeenCalledTimes(1);
  });

  it('should call replaceRowValues to get tooltip description', () => {
    getWrapper({ isWarningError, showError: showError(true), replaceRowValues });
    expect(replaceRowValues).toHaveBeenLastCalledWith(true);
  });

  it('should display warning icon when there is a warning', () => {
    const wrapper = getWrapper({
      isWarningError: isWarningError(true),
      showError: showError(true),
      replaceRowValues,
    });
    expect(wrapper.find('.DatagridCell__warning-icon')).toHaveLength(1);
  });
  it('should display error icon when there was a error', () => {
    const wrapper = getWrapper({
      showError: showError(true),
      replaceRowValues,
    });
    expect(wrapper.find('.DatagridCell__error-icon')).toHaveLength(1);
  });

  it('should render Tooltip in the end', () => {
    const wrapper = getWrapper({
      isWarningError: isWarningError(false),
      showError: showError(true),
      replaceRowValues,
    });

    expect(wrapper.props().content).toEqual('Replaced');
  });
});
