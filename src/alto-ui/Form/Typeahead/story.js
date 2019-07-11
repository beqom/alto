/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
// import { text, boolean, select } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';
import { people, colors } from './data.json';

import Typeahead from './Typeahead';

const colorList = Object.entries(colors).map(([name, hex]) => ({ name, hex }));

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
  .add('custom render', () =>
    React.createElement(() => {
      const [color, setColor] = useState(
        () => colorList[Math.round(Math.random() * colorList.length)]
      );

      const handleChange = hex => {
        if (!hex) setColor({});
        else {
          setColor(colorList.find(c => c.hex === hex));
        }
      };

      return (
        <div style={{ width: 300 }}>
          <Typeahead
            items={colorList}
            onChange={handleChange}
            value={color.hex}
            label="Custom rendering"
            itemToString={item => item.name}
            itemToValue={item => item.hex}
            helpText={color.name ? `name: ${color.name}\nhex: ${color.hex}}` : '-'}
            fields={[
              {
                key: 'hex',
                render: hex => (
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 2,
                      background: hex,
                      boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.3)',
                    }}
                  />
                ),
              },
              { key: 'name', primary: true },
            ]}
          />
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
