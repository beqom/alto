import React from 'react';
import { shallow } from 'enzyme';

import Actions from '../Actions';

import Dropdown from '../../Dropdown';
import Group from '../../Group';

jest.mock('../../Dropdown', () => {
  return props => {
    return <button className="Dropdown" onClick={() => props.onClick()} />;
  };
});

jest.mock('../../Group', () => {
  return  () => {
    return <div className="Group" />;
  };
});

describe('<Actions />', () => {
    const defaultProps = {
      className: 'classTest',
      id: 'id',
      items: [
        {
          icon: null,
          key: '1',
          onClick: () => [],
          title: 'Edit',
        },
        {
          icon: null,
          key: '2',
          onClick: () => [],
          title: 'Edit',
        },
      ],
      max: 1
    };

  const getWrapper = ({ ...props }) => shallow(<Actions {...defaultProps} {...props} />);

  it('should not render if no items are provided', () => {
    expect(getWrapper({items: undefined}).type()).toBe(null);
    expect(getWrapper({items: null}).type()).toBe(null);
    expect(getWrapper({items: []}).type()).toBe(null);
  });

  it('should render Dropdown if more items than max value', () => {
    const wrapper = getWrapper({items: [{key: '1'}, {key: '2'}], max: 1 });
    const DropdownMock = wrapper.find(Dropdown);

    expect(DropdownMock).toHaveLength(1);
  });

    it('should return undefined if onClick props is not a function', () => {
      const wrapper = getWrapper({});
      const DropdownMock = wrapper.find(Dropdown);
      expect(DropdownMock.props().onClick).toBeUndefined();
    });

  it('should render Group if less items than max value', () => {
    const wrapper = getWrapper({items: [{key: '1'}, {key: '2'}], max: 3 });
    const GroupMock = wrapper.find(Group);

    expect(GroupMock).toHaveLength(1);
  });
})

