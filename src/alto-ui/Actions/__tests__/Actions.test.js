import React from 'react';
import { mount } from 'enzyme';

import Actions from '../Actions';
import Dropdown from '../../Dropdown';
import Group from '../../Group';

jest.mock('../../Dropdown', () => {
  return props => {
    return (
      <div className="Dropdown" onClick={() => props.onClick} onKeyDown={() => props.onClick} role="menu" tabIndex="0">
        {props.items.map(action => {
          return (
            <button key={`key_${action.key}`} id={`key_${action.key}`} onClick={() => action.onClick || props.onClick()} />
          )
        })}
      </div>
    )
  };
});

jest.mock('../../Group', () => {
  return  () => {
    return <div className="Group" />;
  };
});

describe('Actions', () => {
  const defaultProps = {
    className: 'classTest',
    id: 'id',
    items: [
      {
        icon: null,
        key: '1',
        onClick: jest.fn(),
        title: 'Edit',
      },
      {
        icon: null,
        key: '2',
        onClick: jest.fn(),
        title: 'Edit',
      },
    ],
    max: 1,
  };

  const getWrapper = ({ ...props }) => mount(<Actions {...defaultProps} {...props} />);

  it('should not render if no items are provided', () => {
    expect(getWrapper({items: undefined}).html()).toBeNull();
    expect(getWrapper({items: null}).html()).toBeNull();
    expect(getWrapper({items: []}).html()).toBeNull();
  });

  it('should render Dropdown if more items than max value', () => {
    const wrapper = getWrapper({items: [{key: '1'}, {key: '2'}], max: 1 });
    const DropdownMock = wrapper.find(Dropdown);

    expect(DropdownMock).toHaveLength(1);
  });

  it('should render Group if less items than max value', () => {
    const wrapper = getWrapper({items: [{key: '1'}, {key: '2'}], max: 3 });
    const GroupMock = wrapper.find(Group);

    expect(GroupMock).toHaveLength(1);
  });

  it('should check selected prop', () => {
    const wrapper = getWrapper({items: [{key: '1', active: true}, {key: '2', active: true}, {key: '3', active: false}, {key: '4', active: true}], max: 3});
    const mockedOutput = ["1", "2", "4"]

    expect(wrapper.find(Dropdown).prop('selected')).toEqual(mockedOutput)
  })

  it('should check items prop', () => {
    const mockedOutput = [
      {
        key: '1',
        title: 'Edit',
        onClick: jest.fn(),
      },
      {
        key: '2',
        title: 'Edit',
        onClick: jest.fn(),
      },
    ]

    const wrapper = getWrapper({});

    expect(JSON.stringify(wrapper.find(Dropdown).prop('items'))).toEqual(JSON.stringify(mockedOutput))
  })

  it('should call onClick props function', () => {

    const mockOnClick = jest.fn()

    const props = {
      className: 'classTest',
      id: 'id_',
      items: [
        {
          key: '1',
          title: 'Edit',
        },
        {
          key: '2',
          title: 'Edit',
        },
      ],
      max: 3,
      onClick: mockOnClick(),
    };

    const wrapper = getWrapper({ props });

    const action = wrapper.find('#key_1')

    action.simulate('click')

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})

