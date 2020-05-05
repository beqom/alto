import React from 'react';
import { mount } from 'enzyme';

import TreeItem from '../TreeItem';
import TreeItemContainer from '../TreeItemContainer';

describe('TreeItemContainer', () => {

  const defaultProps = {
    id: 'id',
    index: 1,
    items: [{ key: 'key_1' }, { key: 'key_2' }],
    item: {
      children: true,
    },
  };

  const getWrapper = props => mount(<TreeItemContainer {...defaultProps} {...props} />);

  it('should render without error', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(TreeItemContainer).exists()).toBe(true);
  });

  describe('constructor', () => {
    it('should call open prop if function', () => {
      const openMock = jest.fn();
      const item = {key: 'val'}
      getWrapper({open: openMock, item})

      expect(openMock).toHaveBeenCalled()
      expect(openMock).toHaveBeenCalledWith(item)
    })

    it('should have truthy open prop', () => {
      const findOpen = wrapper => wrapper.find(TreeItem).prop('state').open

      expect(findOpen(getWrapper({open: jest.fn().mockReturnValue(true)}))).toBe(true)
      expect(findOpen(getWrapper({open: true}))).toBe(true)
    })
  })

  describe('render', () => {
    it('should call clickable prop', () => {
      const clickableMock = jest.fn().mockReturnValue(true);
      const item = {key: 'val'};
      const onClickMock = jest.fn().mockReturnValue(true);
      const hrefMock = jest.fn().mockReturnValue('true');
      
      const findIsClickableProp = props => getWrapper(props).find(TreeItem).prop('isClickable')
      
      getWrapper({clickable: clickableMock, item});

      expect(clickableMock).toHaveBeenCalled()
      expect(clickableMock).toHaveBeenCalledWith(item)

      expect(findIsClickableProp({clickable: clickableMock})).toBe(false)
      expect(findIsClickableProp({clickable: clickableMock, onClick: onClickMock})).toBe(true)
      expect(findIsClickableProp({clickable: clickableMock, href: hrefMock})).toBe(true)
    })
  })

  describe('componentDidMount', () => {

    it('should call checkChildren method', () => {
      const getChildrenMock = jest.fn().mockReturnValue({});

      const props = {
        getChildren: getChildrenMock,
        hasChildren: jest.fn().mockReturnValue(true),
        fetching: false,
        open: true,
      }

      getWrapper(props);

      expect(getChildrenMock).toHaveBeenCalled()
    })
  })
  
  describe('toggle method', () => {
    it('should update open state with opposite value', () => {
        const wrapper = getWrapper();
        expect(wrapper.find(TreeItem).prop('state').open).toBe(false)

        const handleToggle = wrapper.find(TreeItem).prop('handleToggle');
        handleToggle();
        wrapper.update()

        expect(wrapper.find(TreeItem).prop('state').open).toBe(true)
    })

    it('should call onToggle', () => {
      const onToggleMock = jest.fn();
      const item = {key: 'val'}
      const props ={
          onToggle: onToggleMock,
          item,
      }

      const wrapper = getWrapper(props)

      const handleToggle = wrapper.find(TreeItem).prop('handleToggle');
      handleToggle();
      expect(onToggleMock).toHaveBeenCalled()
      expect(onToggleMock).toHaveBeenCalledWith(item, true)
    })

    it('should call checkChildren', () => {
      const getChildrenMock = jest.fn().mockReturnValue({});

      const props = {
        getChildren: getChildrenMock,
        hasChildren: jest.fn().mockReturnValue(true),
        fetching: false,
      }
      
      const wrapper = getWrapper(props);
      expect(wrapper.find(TreeItem).prop('state').open).toBe(false)

      const handleToggle = wrapper.find(TreeItem).prop('handleToggle');
      handleToggle();
      wrapper.update()

      expect(wrapper.find(TreeItem).prop('state').open).toBe(true)

      expect(getChildrenMock).toHaveBeenCalled()
    })
  })

  describe('handleClick method', () => {
    it('should call onClick prop func', () => {
        const onClickMock = jest.fn();
        const item = {key: 'val'}
        const props ={
            handleClick: jest.fn(),
            onClick: onClickMock,
            item,
        };

        const wrapper = getWrapper(props);

        const handleClick = wrapper.find(TreeItem).prop('handleClick');
        handleClick();
        expect(onClickMock).toHaveBeenCalled();
        expect(onClickMock).toHaveBeenCalledWith(item)
    })
  })

  describe('handleLoadMore method', () => {
    it('should update page state', () => {
        const props ={
            handleLoadMore: jest.fn(),
        };

        const wrapper = getWrapper(props);
        expect(wrapper.find(TreeItem).prop('state').page).toBe(1)
        
        const loadMore = wrapper.find(TreeItem).prop('loadMore');
        loadMore();
        wrapper.update();

        expect(wrapper.find(TreeItem).prop('state').page).toBe(2)
    })
  })

  describe('TreeItem labels prop', () => {
    it('should call labels method', () => {
        const props ={
            labels: {
                customLabel: 'customLabel',
            },
        };

        const wrapper = getWrapper(props);

        expect(wrapper.find(TreeItem).prop('labels')).toStrictEqual({
            loadMore: 'Load more',
            customLabel: 'customLabel',
        })
    })
  })

  describe('checkChildren method', () => {
    it('should call checkChildren method', done => {
      const getChildrenMock = jest.fn().mockReturnValue(Promise.resolve([{id: 'id_1'}]));
      const item = {key: 'val'};
      const items = {key: 'val'};
      const index = 1;
      const props = {
        getChildren: getChildrenMock,
        hasChildren: jest.fn().mockReturnValue(true),
        fetching: false,
        item,
        items,
        index,
      }

      const wrapper = getWrapper(props);

      const handleToggle = wrapper.find(TreeItem).prop('handleToggle');
      handleToggle();
      wrapper.update();

      done();

      expect(getChildrenMock).toHaveBeenCalled()
      expect(getChildrenMock).toHaveBeenCalledWith(item, index, items)
    })

    it('should update children state in children is not function', done => {
      const getChildrenMock = jest.fn().mockReturnValue([]);
      const props = {
        getChildren: getChildrenMock,
        hasChildren: jest.fn().mockReturnValue(true),
        fetching: false,
      }
  
      const wrapper = getWrapper(props);
  
      const handleToggle = wrapper.find(TreeItem).prop('handleToggle');
      handleToggle();
      wrapper.update();
      
      expect(getChildrenMock).toHaveBeenCalled()
  
      expect(wrapper.find(TreeItem).prop('state').children).toStrictEqual([])
  
      done();
    })

    it('should update children state in children is function', done => {
      const getChildrenMock = jest.fn().mockReturnValue(Promise.resolve([{id: 'id_1'}]));
      const item = {key: 'val'};
      const items = {key: 'val'};
      const index = 1;
      const props = {
        getChildren: getChildrenMock,
        hasChildren: jest.fn().mockReturnValue(true),
        fetching: false,
        item,
        items,
        index,
      }

      const wrapper = getWrapper(props);

      const handleToggle = wrapper.find(TreeItem).prop('handleToggle');
      handleToggle().then(() => {
        wrapper.update();

        expect(wrapper.find(TreeItem).at(0).prop('state').children).toStrictEqual([{id: 'id_1'}])

        done();
      });
    })
  })
});
