/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React from 'react';
import { boolean } from '@storybook/addon-knobs';

import List from '../List';

function Simple() {
  return (
    <List
      items={['One', 'Two', 'Tree', 'Four', 'Five']}
      sortable={boolean('sortable', false)}
      borderless={boolean('borderless', false)}
      small={boolean('small', false)}
    />
  );
}
export default Simple;
