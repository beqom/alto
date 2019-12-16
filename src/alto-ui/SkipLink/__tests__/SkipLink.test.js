import React from 'react';
import { shallow } from 'enzyme';

import SkipLink from '../SkipLink'

describe('SkipLink', () => {

    beforeEach(() => jest.resetAllMocks());

    const defaultProps = {
        target: 'target',
    }
    
    const getWrapper = props => shallow(<SkipLink {...defaultProps} {...props} />);
    
    it('should render without error',() => {
        const wrapper = getWrapper({});
        
        expect(wrapper.find('.SkipLink').exists()).toBe(true);
    })

    it('should pass target props to a href attribute',() => {
        const wrapper = getWrapper({});

        expect(wrapper.find('.SkipLink').prop('href')).toBe('#target')
    })

    it('should call handleFocus function after button is clicked',() => {
        const focus = jest.fn()
        window.document.getElementById = jest.fn().mockReturnValue({tabIndex: 1,focus });

        const props = {
            preventDefault: jest.fn(),
        }

        const wrapper = getWrapper(props);

        wrapper.find('.SkipLink').simulate('click', props)
        
        expect(focus).toHaveBeenCalledTimes(1)
    })
})
