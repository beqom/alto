import React from 'react';
import { mount } from 'enzyme';

import TreeItem from '../TreeItem'

import { getKey } from '../../../helpers';

jest.mock('../../../helpers', () => ({
	getKey: jest.fn(),
}));

jest.mock('../../../../Icons/ChevronRight', () =>  {
    const ChevronRight = () => <div className="ChevronRight" />;
    return ChevronRight;
});

describe('TreeItem', () => {
    beforeEach(() => jest.resetAllMocks());

    const getWrapper = (defaultProps, props) => mount(<TreeItem {...defaultProps} {...props} />);

    describe('it', () => {
        const defaultProps = {
            hasChildren: jest.fn(),
                state: {
                    open: true,
                    fetching: true,
                    children: [],
                },
                renderItem: jest.fn(),
        }
            
        it('should render without error',() => {
            const wrapper = getWrapper(defaultProps, {})
            
            expect(wrapper.find('.TreeItem').exists()).toBe(true);
            expect(wrapper.find('.TreeItem__title').exists()).toBe(true);
        })
    
        it('should render TreeItem__title with final className',() => {
            const wrapper = getWrapper(defaultProps, {})
                
            expect(wrapper.find('.TreeItem__title--final').exists()).toBe(true);
        })
    
        it('should render TreeItem__spinner element',() => {
            const wrapper = getWrapper(defaultProps, {})
                
            expect(wrapper.find('.TreeItem__spinner').exists()).toBe(true);
        })
    })

    describe('TreeItem__toggle-button element', () => {
        const defaultProps = {
            state: {
                open: true,
                fetching: false,
                children: [],
            },
            renderItem: jest.fn(),
        }

        it('should render without error',() => {
            const props = {
                hasChildren: jest.fn().mockReturnValue(true),
            }
    
            const wrapper = getWrapper(defaultProps, props)
                
            expect(wrapper.find('.TreeItem__toggle-button').exists()).toBe(true);
        })

        it('should render with open className',() => {
            const props = {
                hasChildren: jest.fn().mockReturnValue(true),
            }
    
            const wrapper = getWrapper(defaultProps, props)
                
            expect(wrapper.find('.TreeItem__toggle-button--open').exists()).toBe(true);
        })

        it('should render proper id',() => {
            const props = {
                id: 'id',
                hasChildren: jest.fn().mockReturnValue(true),
            }
    
            const wrapper = getWrapper(defaultProps, props)
                
            expect(wrapper.find('#id__toggle-button').exists()).toBe(true);
        })

        it('should render ChevronRightIcon element',() => {
            const props = {
                hasChildren: jest.fn().mockReturnValue(true),
            }
    
            const wrapper = getWrapper(defaultProps, props)
                
            expect(wrapper.find('.ChevronRight').exists()).toBe(true);
        })

        it('should call handleToggle prop after click',() => {
            const handleToggle = jest.fn()

            const props = {
                hasChildren: jest.fn().mockReturnValue(true),
                handleToggle: handleToggle(),
            }
    
            const wrapper = getWrapper(defaultProps, props)
            const button = wrapper.find('.TreeItem__toggle-button').at(0)

            button.simulate('click')
            
            expect(handleToggle).toHaveBeenCalledTimes(1);
        })
     })
    
    describe('ButtonOrLink', () => {
        const defaultProps = {
            hasChildren: jest.fn(),
                state: {
                    open: true,
                    fetching: true,
                    children: [],
                },
                renderItem: jest.fn(),
                isClickable: true,
        }
            
        it('should render as Link element',() => {
            const props = {
                href: jest.fn().mockReturnValue('link'),
            }

            const wrapper = getWrapper(defaultProps, props)
            
            expect(wrapper.find('Link').exists()).toBe(true);
        })

        it('should render as button element',() => {
            const props = {
                href: 'href',
            }

            const wrapper = getWrapper(defaultProps, props)
            
            expect(wrapper.find('button').exists()).toBe(true);
        })

        it('should render without error',() => {
            const wrapper = getWrapper(defaultProps, {})
            
            expect(wrapper.find('.TreeItem__button').exists()).toBe(true);
        })

        it('should render with id attribute',() => {
            const props = {
                id: 'id',
            }
    
            const wrapper = getWrapper(defaultProps, props)

            expect(wrapper.find('#id__button').exists()).toBe(true);
        })

        it('should render with href attribute',() => {
            const props = {
                href: jest.fn().mockReturnValue('someLink'),
            }

            const wrapper = getWrapper(defaultProps, props)
            
            expect(wrapper.find('.TreeItem__button').first().find('a').prop('href')).toBe('someLink')
        })

        it('should render with active className',() => {
            const obj = {foo: 'bar'}

            const props = {
                selected: obj,
                item: obj,
            }
    
            const wrapper = getWrapper(defaultProps, props)
            
            expect(wrapper.find('.TreeItem__button--active').exists()).toBe(true);

            getKey.mockReturnValue('test')

            const propsTwo = {
                selected: 'test',
            }

            const wrapperTwo = getWrapper(defaultProps, propsTwo)
            
            expect(wrapperTwo.find('.TreeItem__button--active').exists()).toBe(true);
        })

        it('should call renderItem function',() => {
            const mockRenderItem = jest.fn()

            const props = {
                renderItem: mockRenderItem,
            }
    
            getWrapper(defaultProps, props)
            
            expect(mockRenderItem).toHaveBeenCalledTimes(1)

            const mockRenderItemTwo = jest.fn()

            const propsTwo = {
                renderItem: mockRenderItemTwo,
            }
    
            getWrapper(defaultProps, propsTwo)
            
            expect(mockRenderItemTwo).toHaveBeenCalledTimes(1)
        })
    })

    describe('renderChildren', () => {

        const defaultProps = {
            hasChildren: jest.fn(),
                state: {
                    open: true,
                    fetching: true,
                    children: [{}],
                },
            renderItem: jest.fn(),
            isClickable: true,
            id: 'testId',
            loadMore: jest.fn(),
            labels: {
                loadMore: 'test_label',
            },
            childrenPerPage: 1,
        }

        it('should render without error',() => {
            const wrapper = getWrapper(defaultProps, {})
            
            expect(wrapper.find('.TreeItem__subtree').exists()).toBe(true);
        })

        it('should render null',() => {
            getKey.mockReturnValue(Math.random().toString(36).substr(2, 9))

            expect(getWrapper(defaultProps, {
                state: {
                    open: false,
                },
            }).find('.TreeItem__subtree').exists()).toBe(false);

            expect(getWrapper(defaultProps, {
                state: {
                    children: [],
                },
            }).find('.TreeItem__subtree').exists()).toBe(false);

            expect(getWrapper(defaultProps, {
                state: {
                    children: null,
                },
            }).find('.TreeItem__subtree').exists()).toBe(false);
        })

        it('should render Button element', () => {
            const wrapper = getWrapper(defaultProps, {})

            expect(wrapper.find('.TreeItem__button-load-more').exists()).toBe(true);
            expect(wrapper.find('#testId__load-more').exists()).toBe(true);
            expect(wrapper.find('.TreeItem__button-load-more').at(0).text()).toBe('test_label');
        })

        it('should call loadMore function after Button is clicked', () => {
            const mockLoadMore = jest.fn()

            const props = {
                loadMore: mockLoadMore,
            }
    
            const button = getWrapper(defaultProps, props).find('.TreeItem__button-load-more').at(0)

            button.simulate('click')
            
            expect(mockLoadMore).toHaveBeenCalledTimes(1)
        })
    })
})
