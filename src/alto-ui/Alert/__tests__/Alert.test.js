import React from 'react';
import { shallow } from 'enzyme';

import Alert from '../Alert';

import CheckCircleIcon from '../../Icons/CheckCircle';
import ExclamationTriangleIcon from '../../Icons/ExclamationTriangle';
import ExclamationCircleIcon from '../../Icons/ExclamationCircle';
import InfoCircleIcon from '../../Icons/InfoCircle';
import CloseIcon from '../../Icons/Close';

describe('<Alert />', () => {
  it('should render null if show is false', () => {
    const wrapper = shallow(<Alert show={false} />);
    expect(wrapper.find('.Alert').exists()).toBe(false);
  });

  it('should support severals modifiers', () => {
    ['filled', 'success', 'warning', 'error'].forEach(modifier => {
      const wrapper = shallow(<Alert {...{ [modifier]: true }} />);
      expect(wrapper.prop('className')).toBe(`Alert Alert--${modifier}`);
    });
  });

  it('should support closable modifier', () => {
    const wrapper = shallow(<Alert onClose={x => x} />);
    expect(wrapper.prop('className')).toBe(`Alert Alert--closable`);
  });

  it('should render CheckCircleIcon if success', () => {
    const wrapper = shallow(<Alert success />);
    expect(wrapper.find(CheckCircleIcon).exists()).toBe(true);
  });

  it('should render ExclamationTriangleIcon if warning', () => {
    const wrapper = shallow(<Alert warning />);
    expect(wrapper.find(ExclamationTriangleIcon).exists()).toBe(true);
  });

  it('should render ExclamationCircleIcon if error', () => {
    const wrapper = shallow(<Alert error />);
    expect(wrapper.find(ExclamationCircleIcon).exists()).toBe(true);
  });

  it('should render InfoCircleIcon in others case', () => {
    const wrapper = shallow(<Alert />);
    expect(wrapper.find(InfoCircleIcon).exists()).toBe(true);
  });

  it('should render alertMessage with children', () => {
    const children = <span>My children</span>;
    const wrapper = shallow(<Alert>{children}</Alert>);
    expect(wrapper.find('.Alert__message').text()).toBe('My children');
  });

  it('should not render CloseIcon if there is no onClose', () => {
    const wrapper = shallow(<Alert />);
    expect(wrapper.find(CloseIcon).exists()).toBe(false);
  });

  it('should render CloseIcon with onClick prop if there is onClose', () => {
    const onClose = x => x;
    const wrapper = shallow(<Alert onClose={onClose} />);
    const closeIcon = wrapper.find(CloseIcon);
    expect(closeIcon.exists()).toBe(true);
    expect(closeIcon.prop('onClick')).toBe(onClose);
  });
});
