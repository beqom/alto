/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, text } from '@storybook/addon-knobs';
import withReadme from 'storybook-readme/with-readme';
import styled from 'styled-components';

import SideNav from './SideNav';
import README from './README.md';

import LightbulbIcon from '../Icons/Lightbulb';
import BoltIcon from '../Icons/Bolt';
import ObjectsIcon from '../Icons/Objects';

const Container = styled.div`
  height: 600px;
  width: 200px;
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

const urls = items
  .map(item => item.items.map(({ url }) => url))
  .reduce((acc, val) => acc.concat(val));

storiesOf('SideNav', module)
  .addDecorator(withReadme(README))
  .addDecorator(story => <Container>{story()}</Container>)
  .addWithJSX('overview', () => (
    <SideNav
      logo={text('logo', 'Brand')}
      logoSmall={text('logoSmall', 'B.')}
      logoUrl="#"
      currentUrl={select('currentUrl', ['none'].concat(urls), '#three')}
      items={items}
      expandButtonLabel="click to expand side navigation"
      collapseButtonLabel="click to collapse side navigation"
    />
  ));
