import React from 'react';
import { mount } from 'enzyme';

import Actions from '../Actions';
import Dropdown from '../../Dropdown';
import Group from '../../Group';

jest.mock('../../Dropdown', () => {
  return props => {
    return (
      <div role="menu" tabIndex="0">
        {props.items.map(action => {
          return (
            <button key={`key_${action.key}`} id={`key_${action.key}`} onClick={action.onClick || props.onClick} />
          )
        })}
      </div>
    )
  };
});

jest.mock('../../Group', () => {
  return props => {
    return (
      <div role="menu" tabIndex="0" items={props.items} />
    )
  };
});

describe('Actions', () => {
  const getWrapper = (defaultProps, props) => mount(<Actions {...defaultProps} {...props} />);

  describe('should return Dropdown component', () => {
    let wrapper;
    let defaultProps;
    let items;

    beforeEach(() => {
      jest.clearAllMocks();
      items = [
        {key: '1', title: '1', active: true},
        {key: '2', title: '2'},
        {key: '3', title: '3', active: true},
      ]
      defaultProps = {
        id: 'id',
        items,
        max: 0,
      }
    });

    it('without error', () => {
      wrapper = getWrapper(defaultProps, {});
      const DropdownMock = wrapper.find(Dropdown);
  
      expect(DropdownMock).toHaveLength(1);
    });

    it('with right selected prop', () => {
      wrapper = getWrapper(defaultProps, {});
      expect(wrapper.find(Dropdown).prop('selected')).toEqual(["1", "3"])
    })

    describe('with right items prop:', () => {
      it('without error', () => {
        wrapper = getWrapper(defaultProps, {});
        expect(wrapper.find('button').length).toBe(items.length)
      })

      it('which should call onClick prop after click', () => {
        const mockedOnClick = jest.fn()
        const props = {
          items: [
            {key: '1', title: '1', onClick: mockedOnClick},
          ],
        }

        wrapper = getWrapper(defaultProps, props);
        const button = wrapper.find('button')
        button.simulate('click')

        expect(mockedOnClick).toHaveBeenCalledTimes(1)
      })

      it('which should call handleClick after click', () => {
        const mockedHandleClick = jest.fn();
        const props = {
          items: [
            {key: '1', title: '1'},
          ],
          onClick: mockedHandleClick,
        }

        wrapper = getWrapper(defaultProps, props);
        const button = wrapper.find('button')
        button.simulate('click')

        expect(mockedHandleClick).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('should return Group component', () => {
    let wrapper;
    let defaultProps;
    let items;

    beforeEach(() => {
      jest.clearAllMocks();
      items = [
        {key: '1', title: '1', active: true},
        {key: '2', title: '2'},
        {key: '3', title: '3', active: true},
      ]
      defaultProps = {
        id: 'id',
        items,
        max: 4,
      }
    });

    it('without error', () => {
      wrapper = getWrapper(defaultProps, {});
      const GroupMock = wrapper.find(Group);
  
      expect(GroupMock).toHaveLength(1);
    });

    it('with right items prop length', () => {
        wrapper = getWrapper(defaultProps, {});
        expect(wrapper.prop('items').length).toBe(items.length)
    })
  })
})
