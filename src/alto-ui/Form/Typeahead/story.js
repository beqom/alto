/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
// import { text, boolean, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import { people, colors } from './data.json';

import Typeahead from './Typeahead';

storiesOf('Form/Typeahead', module)
  .addDecorator(centered)
  .add('overview', () =>
    React.createElement(() => {
      const [value, setValue] = useState('');
      return (
        <div style={{ width: 300 }}>
          <Typeahead items={Object.keys(colors)} onChange={setValue} value={value} />
        </div>
      );
    })
  )
  .addWithJSX('With Media', () => (
    <div style={{ width: 500 }}>
      <Typeahead
        items={people}
        contained
        fields={[
          {
            key: 'name',
            type: 'media',
            primary: true,
            props: (name, user) => ({
              subtitle: user.job,
              src: user.img,
              description: user.bio,
            }),
          },
          {
            key: 'domain',
            type: 'badge',
            props: badge => ({
              yellow: badge === 'Human Ressources',
              indigo: badge === 'Finance',
              pink: badge === 'Product',
            }),
          },
        ]}
      />
    </div>
  ));
