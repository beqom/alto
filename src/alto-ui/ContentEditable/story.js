/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import StateProvider from '../StateProvider';
import ContentEditable from './ContentEditable';

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Mauris lobortis lacus a interdum fringilla.
Donec consequat, mi eu cursus ultricies, leo felis rhoncus turpis, at sollicitudin lectus erat id elit.
Sed ac molestie turpis.
Cras interdum pulvinar tortor, nec dapibus augue.
Donec volutpat ut mauris at consequat.
Sed mollis congue commodo.
Duis vitae blandit augue.
Proin euismod congue lobortis.
Nulla lobortis dapibus nibh, vel tincidunt erat.
Ut porttitor ornare odio, ac iaculis orci facilisis nec.
Pellentesque eleifend consectetur risus, eu scelerisque metus ullamcorper suscipit.
Sed at dapibus mi, eget maximus augue.
Vivamus lacinia ipsum at augue sagittis, nec lacinia est pharetra.
Quisque risus nunc, venenatis ut convallis id, mollis vitae eros.
Vivamus porttitor, turpis sed ullamcorper rhoncus, est turpis finibus magna, non varius elit urna sed mi.
`;

storiesOf('ContentEditable', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <StateProvider state={{ value: lorem }}>
      {(state, setState) => (
        <ContentEditable
          style={{ width: 600 }}
          onChange={(_, value) => setState({ value })}
          disabled={boolean('disabled', false)}
          value={state.value}
        />
      )}
    </StateProvider>
  ));
