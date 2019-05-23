/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean, number } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import MediaObject from '../MediaObject';
import ShowMore from '../ShowMore';
import Table from '../Table';
import Switch from '../Form/Switch';
import StateProvider from '../StateProvider';

import Pencil from '../Icons/Pencil';
import Trash from '../Icons/Trash';
import Duplicate from '../Icons/Duplicate';

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

const actions = [
  {
    key: '1',
    Icon: Pencil,
    title: 'Edit',
    onClick: () => {},
  },
  {
    key: '3',
    Icon: Duplicate,
    title: 'Duplicate',
    onClick: () => {},
  },
  {
    key: '2',
    Icon: Trash,
    title: 'Delete',
    onClick: () => {},
  },
];

storiesOf('Card', module)
  .addDecorator(story => <div style={{ width: 400 }}>{story()}</div>)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <Card
      id="1"
      title={text('title', 'My Card')}
      active={boolean('active', false)}
      actions={actions.slice(
        0,
        number('How many actions ?', 1, { range: true, min: 0, max: 3, step: 1 })
      )}
      dragHandleProps={boolean('dragHandleProps', false) ? {} : undefined}
      {...['pink', 'indigo', 'teal', 'lime', 'yellow', 'orange', 'red'].reduce(
        (acc, color) => ({ ...acc, [color]: boolean(color, false) }),
        {}
      )}
    >
      {text(
        'children',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vitae neque ac nisl sollicitudin fermentum. Sed fringilla, lacus sit amet ornare mollis, nunc ante tempor risus, nec pretium nibh magna efficitur metus.'
      )}
    </Card>
  ))
  .addWithJSX('with MediaObject', () => (
    <Card id="1">
      <MediaObject
        title="Sherry Franklin"
        subtitle="Head of Group Accounting"
        src="http://i.pravatar.cc/150?img=49"
        alt="picture of Sherry Franklin"
        avatar
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
