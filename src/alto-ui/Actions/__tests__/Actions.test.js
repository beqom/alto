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
    max: 1
  };

  const getWrapper = ({ ...props }) => shallow(<Actions {...defaultProps} {...props} />);

  it('should not render if no items are provided', () => {
    expect(getWrapper({items: undefined}).type()).toBeNull();
    expect(getWrapper({items: null}).type()).toBeNull();
    expect(getWrapper({items: []}).type()).toBeNull();
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
})

