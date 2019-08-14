import React from 'react';
import { shallow } from 'enzyme';

import ButtonGroup from '../ButtonGroup';

describe('ButtonGroup', () => {
  const getSpecificButtonProps = (buttonGroupWrapper, index) => (
    buttonGroupWrapper.find('button').at(index).props()
  );

  it('is ButtonGroup', () => {
    const buttonGroup = shallow(<ButtonGroup />);

    expect(buttonGroup).toBeTruthy();
  });
  it('has less then two items', () => {
    const buttonGroup = shallow(<ButtonGroup items={[{ value: 1 }]} />);

    expect(buttonGroup.find('button')).toHaveLength(0);
  });
  it('has more then two items', () => {
    const items = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const buttonGroup = shallow(<ButtonGroup items={items} />);

    expect(buttonGroup.find('button')).toHaveLength(items.length);
  });
  it('has additional class', () => {
    const items = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const buttonGroup = shallow(<ButtonGroup items={items} className="test-class" />);

    expect(buttonGroup.prop('className')).toMatch('test-class');
  });
  it('has each button with small flag', () => {
    const items = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const buttonGroup = shallow(<ButtonGroup items={items} small />);
    const buttons = buttonGroup.find('button');

    buttons.forEach(button => {
      expect(button.prop('className')).toMatch('--small');
    });
  });
  it('has no active buttons', () => {
    const items = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const buttonGroup = shallow(<ButtonGroup items={items} />);
    const buttons = buttonGroup.find('button');

    buttons.forEach(button => {
      expect(button.prop('className')).not.toMatch('--active');
    });
  });
  it('has only second button as active on default', () => {
    const items = [{ value: 1 }, { value: 'active' }, { value: 3 }];
    const buttonGroup = shallow(<ButtonGroup items={items} value="active" />);

    expect(getSpecificButtonProps(buttonGroup, 0).className).not.toMatch('--active');
    expect(getSpecificButtonProps(buttonGroup, 1).className).toMatch('--active');
    expect(getSpecificButtonProps(buttonGroup, 2).className).not.toMatch('--active');
  });
  describe('Toggable tests', () => {
    describe('More than two buttons test case', () => {
      const onChange = jest.fn();
      const items = [{ value: 1 }, { value: 2 }, { value: 3 }];
      const buttonGroup = shallow(<ButtonGroup items={items} value={2} onChange={onChange} />);

      it('has no effect on click on active button', () => {
        const buttons = buttonGroup.find('button')
        buttons.at(1).simulate('click');
        expect(onChange).not.toHaveBeenCalled();
      });
      it('call onChange with firstone', () => {
        const buttons = buttonGroup.find('button');
        buttons.at(0).simulate('click');
        expect(onChange).toHaveBeenCalledWith(1);
      });
      it('call onChange with lastone', () => {
        const buttons = buttonGroup.find('button');
        buttons.at(2).simulate('click');
        expect(onChange).toHaveBeenCalledWith(3);
      });
      it('callbacks two times', () => {
        expect(onChange).toHaveBeenCalledTimes(2);
      })
    });
    describe('Exactly two buttons test case', () => {
      const onChange = jest.fn();
      const items = [{ value: 1 }, { value: 2 }];
      const buttonGroup = shallow(<ButtonGroup items={items} value={2} onChange={onChange} />);

      it('callbacks with second button value on click on active', () => {
        buttonGroup.find('button').at(1).simulate('click');

        expect(onChange).toHaveBeenCalledWith(1);
      });
      it('callbacks with this same button value on click on NO active', () => {
        buttonGroup.find('button').at(0).simulate('click');

        expect(onChange).toHaveBeenCalledWith(1);
      });
    })
  });
});
