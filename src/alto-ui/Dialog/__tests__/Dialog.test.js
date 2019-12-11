import React from 'react';
import { shallow } from 'enzyme';

import Dialog from '../Dialog';

import CloseButton from '../../CloseButton';
import Button from '../../Button';

jest.mock('../../CloseButton', () => ({onClick}) => ( <button className="CloseButton" onClick={() => onClick()} /> ));

jest.mock('../../Button', () => ({onClick}) => ( <button className="Dialog__button" onClick={() => onClick()}/> ));

describe('Dialog', () => {

  const defaultProps = {
    id: 'id',
  }

  const getWrapper = props => shallow(<Dialog {...defaultProps} {...props} />);

  it('should render without error',() => {
    const wrapper = getWrapper({
      id: 'key'
    });
    expect(wrapper.find('.Dialog__overlay').exists()).toBe(true);
  })

  it('should has Overlay element',() => {
    const props = {
      open: false,
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog__overlay').exists()).toBe(true);
  })

  it('should has element with Dialog className',() => {
    const props = {
      open: true,
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog').exists()).toBe(true);
  })

  it('should no has element with Dialog__header className',() => {

    const propsNegative = {
      open: true,
      title: ''
    }

    const propsClose = {
      open: true,
      onClose: undefined
    }

    expect(getWrapper(propsNegative).find('.Dialog__header').exists()).toBe(false);
    expect(getWrapper(propsClose).find('.Dialog__header').exists()).toBe(false);

  })

  it('should has element with Dialog__header className',() => {
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

  it('should has heading element',() => {
    const props = {
      open: true,
      title: 'string',
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog__title').exists()).toBe(true);
  })

  it('should has CloseButton element',() => {
    const props = {
      open: true,
      onClose: jest.fn()
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find(CloseButton)).toHaveLength(1);
  })

  it('should run function while click CloseButton',() => {
    const ClicknMock = jest.fn()

    const props = {
      open: true,
      onClose: ClicknMock
    }

    const wrapper = getWrapper(props);

    wrapper.find(CloseButton).simulate('click')

    expect(ClicknMock).toHaveBeenCalledTimes(1)
  })

  it('should has element with Dialog__header className',() => {
    const props = {
      open: true,
      title: 'string'
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog__header').exists()).toBe(true);
  })

  it('should has element with Dialog__header-stroke',() => {
    const props = {
      open: true,
      title: 'string'
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog__header-stroke').exists()).toBe(true);
  })

  it('should has element with Dialog__footer',() => {
    const props = {
      open: true,
      buttons: [{
        onClick: jest.fn(),
        children: 'string'
      }]
    }

    const wrapper = getWrapper(props);
    expect(wrapper.find('.Dialog__footer').exists()).toBe(true);
  })

  it('should has Button element', () => {
    const propsOne = {
      open: true,
      buttons: [{
        onClick: jest.fn(),
        children: 'string'
      }]
    }

    const propsTwo = {
      open: true,
      buttons: ['string']
    }

    const wrapperOne = getWrapper(propsOne);
    expect(wrapperOne.find(Button)).toHaveLength(1);

    const wrapperTwo = getWrapper(propsTwo);
    expect(wrapperTwo.find(Button)).toHaveLength(1);
  })

  it('should run function while click Button', () => {
    const ClicknMock = jest.fn()

    const props = {
      open: true,
      buttons: [{
        onClick: ClicknMock,
        children: 'string'
      }]
    }

    const wrapper = getWrapper(props);
    wrapper.find(Button).simulate('click')

    expect(ClicknMock).toHaveBeenCalledTimes(1)
  })

  it('should has Button element with disabled props', () => {
    const propsOne = {
      open: true,
      buttons: [{
        onClick: jest.fn(),
        children: 'string',
        disabled: true
      }]
    }


    const wrapperOne = getWrapper(propsOne);
    expect(wrapperOne.find(Button).prop('disabled')).toBe(true);

    const propsTwo = {
      open: true,
      buttons: [{
        onClick: jest.fn(),
        children: 'string',
      }],
      inert: true
    }

    const wrapperTwo = getWrapper(propsTwo);
    expect(wrapperTwo.find(Button).prop('disabled')).toBe(true);
  })

  it('should has Button element with true flat props', () => {
    const propsOne = {
      open: true,
      buttons: [{
        onClick: jest.fn(),
        children: 'string',
      },{
        onClick: jest.fn(),
        children: 'string',
      }]
    }

    const wrapperOne = getWrapper(propsOne);
    expect(wrapperOne.find('#id__button--1').prop('flat')).toBe(true);
  })
  
  it('should has Button element with false flat props', () => {
    const propsOne = {
      open: true,
      buttons: [{
        onClick: jest.fn(),
        children: 'string',
      }]
    }

    const wrapperOne = getWrapper(propsOne);
    expect(wrapperOne.find('#id__button--1').prop('flat')).toBe(false);
  })

})
