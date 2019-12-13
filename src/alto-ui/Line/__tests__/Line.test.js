import React from 'react';
import { shallow } from 'enzyme'

import Line from './../Line'

describe('Line', () => {
    
    const getWrapper = props => shallow(<Line {...props} />);
    
    it('should render without error',() => {
        const wrapper = getWrapper({});

        expect(wrapper.find('.Line').exists()).toBe(true);
    });

    it('should return element with className from props', () => {
        const props = {
            vertical: true,
        }

        const wrapper = getWrapper(props);

        expect(wrapper.find('.Line--vertical').exists()).toBe(true);
    });

    it('should pass custom props to Line element', () => {
        expect(getWrapper({propsMock: true}).find('.Line').prop('propsMock')).toBe(true);
    })
})
