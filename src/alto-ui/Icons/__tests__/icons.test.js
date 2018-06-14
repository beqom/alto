import React from 'react';
import { shallow } from 'enzyme';

import Icon from '../Icon';
import icons from '../index';

describe('icons', () => {
  Object.entries(icons).forEach(([name, IconComponent]) => {
    describe(`<${name} />`, () => {
      it(`default`, () => {
        const wrapper = shallow(<IconComponent foo="bar" />);
        expect(wrapper.type()).toBe(Icon);
        expect(wrapper.prop('foo')).toEqual('bar');
        expect(typeof wrapper.prop('children')).toBe('function');
        expect(shallow(wrapper.prop('children')({})).exists()).toBe(true);
      });

      const { outline, badged } = IconComponent.propTypes || {};

      if (outline) {
        it(`outline`, () => {
          const wrapper = shallow(<IconComponent outline />);
          expect(shallow(wrapper.prop('children')({})).exists()).toBe(true);
        });
      }

      if (badged) {
        it(`badged`, () => {
          const wrapper = shallow(<IconComponent badged />);
          expect(shallow(wrapper.prop('children')({})).exists()).toBe(true);
        });
      }

      if (outline && badged) {
        it(`outline badged`, () => {
          const wrapper = shallow(<IconComponent outline badged />);
          expect(shallow(wrapper.prop('children')({})).exists()).toBe(true);
        });
      }
    });
  });
});
