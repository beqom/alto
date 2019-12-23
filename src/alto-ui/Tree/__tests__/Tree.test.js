import React from 'react';
import { shallow } from 'enzyme';

import Tree from '../Tree'

import { getKey } from './../helpers';

jest.mock('./../helpers', () => ({
	getKey: jest.fn(),
}));

describe('Tree', () => {
    beforeEach(() => {
        jest.resetAllMocks()
        getKey.mockReturnValue('test')
    });

    const defaultProps = {
        id: 'id',
        items: [{}],
    }
    
    const getWrapper = props => shallow(<Tree {...defaultProps} {...props} />);
    
    it('should render without error',() => {
        const wrapper = getWrapper({});
        
        expect(wrapper.find('.Tree').exists()).toBe(true);
    })

    describe('getKey func', () => {
        it('should pass formated value to TreeItem id value',() => {
    
            const wrapper = getWrapper({});
                    
            expect(wrapper.find('#id__item--test-0').key()).toEqual('test')
        })
    
        it('should pass formated value to TreeItem key value',() => {    
            const wrapper = getWrapper({});
                    
            expect(wrapper.find('#id__item--test-0').key()).toEqual('test')
        })
    })
})
