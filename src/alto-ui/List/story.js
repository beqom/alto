/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, object, array, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import List from './List';
import Avatar from '../Avatar';

const items = [
  { id: 'one', title: 'One', url: '#one' },
  { id: 'two', title: 'Two', url: '#two' },
  { id: 'three', title: 'Three', url: '#three' },
  { id: 'four', title: 'four', url: '#four' },
  { id: 'five', title: 'five', url: '#five' },
  { id: 'six', title: 'six', url: '#six' },
  { id: 'seven', title: 'seven', url: '#seven' },
  { id: 'eight', title: 'eight', url: '#eight' },
];

const people = [
  { id: '1', name: 'Sherry Franklin', job: 'Head of Group Accounting', url: '#', img: 'http://i.pravatar.cc/150?img=1' },
  { id: '2', name: 'Kenneth Daughtry', job: 'Head of Group Tax', url: '#', img: 'http://i.pravatar.cc/150?img=2' },
  { id: '3', name: 'Carl Mattson', job: 'Head of Group Treasury', url: '#', img: 'http://i.pravatar.cc/150?img=3' },
  { id: '4', name: 'Erin Jackson', job: 'Group HR Services Manager', url: '#', img: 'http://i.pravatar.cc/150?img=4' },
  { id: '5', name: 'Bart Simpson', job: 'I have no image ¯\\_(ツ)_/¯', url: '#', img: 'none' },
  { id: '6', name: 'Elizabeth Taylor', job: 'Head of Compensation & Benefits', url: '#', img: 'http://i.pravatar.cc/150?img=6' },
  { id: '7', name: 'Gladys Moreno', job: 'Head of HR Talent Management', url: '#', img: 'http://i.pravatar.cc/150?img=7' },
  { id: '8', name: 'Kyle Huffman', job: 'Head of ITC', url: '#', img: 'http://i.pravatar.cc/150?img=8' },
]


storiesOf('List', module)
  .addDecorator(story => (
    <div style={{ width: 600, maxWidth: '100%' }}>
      {story()}
    </div>
  ))
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <List
      items={object('items', items)}
      selected={text('selected', 'five')}
    />
  ))
  .addWithJSX('simple', () => (
    <List
      items={array('items', ['Apple', 'Orange', 'Banana'])}
      selected={text('selected', '')}
    />
  ))
  .addWithJSX('with Avatars', () => {
    const selected = text('selected', '3');
    const users = object('items', people);
    return (
      <List
        items={users}
        selected={selected}
      >
        {(item, active) => (
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <Avatar src={item.img} alt={`image of ${item.name}`} />
            <div style={{ marginLeft: 20 }}>
              <div>{item.name}</div>
              <div style={{ color: active ? 'white' : 'black', marginTop: 5, opacity: 0.5 }}>
                {item.job}
              </div>
            </div>
          </div>
        )}
      </List>
    );
  });
