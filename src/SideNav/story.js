/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
// import { boolean, text, number, color, array, object, select, date } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import styled from 'styled-components';

import SideNav from './SideNav';
import README from './README.md';

import LightbulbIcon from '../Icons/Lightbulb';
import BoltIcon from '../Icons/Bolt';
import ObjectsIcon from '../Icons/Objects';

const Container = styled.div`
  height: 600px;
`;

Container.displayName = 'div';

const items = [
  { title: 'Numbers', icon: LightbulbIcon, items: [
    { title: 'One', url: '#one' },
    { title: 'Two', url: '#two' },
    { title: 'Three', url: '#three' },
    { title: 'Foor', url: '#foor' },
    { title: 'Five', url: '#five' },
  ]},
  { title: 'Fruits', icon: BoltIcon, items: [
    { title: 'Apple', url: '#apple' },
    { title: 'Banana', url: '#banana' },
    { title: 'Orange', url: '#orange' },
  ]},
  { title: 'FBB', icon: ObjectsIcon, items: [
    { title: 'Foo', url: '#foo' },
    { title: 'Bar', url: '#bar' },
    { title: 'Baz', url: '#baz' },
  ]},
];

storiesOf('SideNav', module)
  .addDecorator(withReadme(README))
  .addDecorator(story => <Container>{story()}</Container>)
  .addWithJSX('overview', () => (
    <SideNav
      logo="Brand"
      logoSmall="B."
      logoUrl="#"
      items={items}
      currentItem="#three"
    />
  ));
