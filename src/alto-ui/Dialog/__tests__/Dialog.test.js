import React from 'react';
import { shallow } from 'enzyme';

import Dialog from '../Dialog';

import CloseButton from '../../CloseButton';

jest.mock('../../CloseButton', () => {
  return props => {
    return <button className="CloseButton" onClick={() => props.onClick()} />;
  };
});

describe('Dialog', () => {

  const defaultProps = {
    id: 'string',
    // className: 'string',
    // open: true,
    // title: 'string',
    // onClose: jest.fn(),
    // buttons: [{}, {}],
    // closeFocusTargetId: 'string',
    // inert: true,
    // a11yLabelClose: 'string',
  }

  const getWrapper = ({ ...props }) => shallow(<Dialog {...defaultProps} {...props} />);

  it('is Dialog',() => {
    const wrapper = getWrapper({
      id: 'key'
    });
    expect(wrapper.find('.Dialog__overlay').exists()).toBe(true);
  })

  it('should render div with Dialog className',() => {
    const props = {
      open: true,
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog').exists()).toBe(true);
  })

  it('should render header with Dialog__header className',() => {
    const propsTitle = {
      open: true,
      title: 'string'
    }

    const propsClose = {
      open: true,
      onClose: jest.fn()
    }

    expect(getWrapper(propsTitle).find('.Dialog__header').exists()).toBe(true);
    expect(getWrapper(propsClose).find('.Dialog__header').exists()).toBe(true);
  })

  it('should render h2 with Dialog__title className',() => {
    const props = {
      open: true,
      title: 'string',
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog__title').exists()).toBe(true);
  })

  it('should render CloseButton',() => {
    const props = {
      open: true,
      onClose: jest.fn()
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find(CloseButton)).toHaveLength(1);
  })

  it('should call function while click CloseButton',() => {
    const ClicknMock = jest.fn()

    const props = {
      open: true,
      onClose: ClicknMock
    }

    const wrapper = getWrapper(props);

    wrapper.find(CloseButton).simulate('click')

    expect(ClicknMock).toHaveBeenCalledTimes(1)
  })

  it('should render header with Dialog__header className',() => {
    const props = {
      open: true,
      title: 'string'
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog__header').exists()).toBe(true);
  })

  it('should render hr with Dialog__header-stroke',() => {
    const props = {
      open: true,
      title: 'string'
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog__header-stroke').exists()).toBe(true);
  })

  it('should render footer with Dialog__footer',() => {
    const props = {
      open: true,
      title: 'string',
      buttons: [{
        onClick: jest.fn(),
        children: 'string'
      }]
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog__footer').exists()).toBe(true);
  })

})
