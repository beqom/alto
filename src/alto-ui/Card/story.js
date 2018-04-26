/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import MediaObject from '../MediaObject';
import ShowMore from '../ShowMore';
import Table from '../Table';
import Switch from '../Form/Switch';
import StateProvider from '../StateProvider';

import Card from './Card';

const people = [
  {
    id: '1',
    name: 'Sherry Franklin',
    job: 'Head of Group Accounting',
    img: 'http://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Kenneth Daughtry',
    job: 'Head of Group Tax',
    img: 'http://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Carl Mattson',
    job: 'Head of Group Treasury',
    img: 'http://i.pravatar.cc/150?img=3',
  },
  {
    id: '4',
    name: 'Erin Jackson',
    job: 'Group HR Services Manager',
    img: 'http://i.pravatar.cc/150?img=4',
  },
];

storiesOf('Card', module)
  .addDecorator(story => <div style={{ width: 400 }}>{story()}</div>)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Card
      title={text('title', 'My Card')}
      small={boolean('small', false)}
      large={boolean('large', false)}
    >
      {text(
        'children',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae neque ac nisl sollicitudin fermentum. Sed fringilla, lacus sit amet ornare mollis, nunc ante tempor risus, nec pretium nibh magna efficitur metus.'
      )}
    </Card>
  ))
  .addWithJSX('with MediaObject', () => (
    <Card small={boolean('small', false)} large={boolean('large', false)}>
      <MediaObject
        title="Sherry Franklin"
        subtitle="Head of Group Accounting"
        src="http://i.pravatar.cc/150?img=49"
        alt="picture of Sherry Franklin"
        avatar
        small={boolean('small', false)}
        large={boolean('large', false)}
      />
    </Card>
  ))
  .addWithJSX('widget example', () => (
    <StateProvider state={{ public: true, notification: false }}>
      {(state, setState) => (
        <div style={{ position: 'absolute', top: 200 }}>
          <Card title="My profile">
            <MediaObject
              title="Sherry Franklin"
              subtitle="Head of Group Accounting"
              src="http://i.pravatar.cc/150?img=49"
              alt="picture of Sherry Franklin"
              avatar
            />
            <br />
            <Switch
              id="widget-public"
              label="Public profile"
              onChange={e => setState({ public: e.target.checked })}
              checked={state.public}
            />
            <Switch
              id="widget-notifications"
              label="Enable motifications"
              onChange={e => setState({ notification: e.target.checked })}
              checked={state.notification}
            />
            <br />
            <ShowMore labelToOpen="view my team" labelToClose="hide my team">
              <Table
                compact
                columns={[
                  { key: 'img', title: 'Picture', type: 'image' },
                  { key: 'name', title: 'Name' },
                  { key: 'job', title: 'Job name' },
                ]}
                rows={people}
                rowId="id"
              />
            </ShowMore>
          </Card>
        </div>
      )}
    </StateProvider>
  ));
