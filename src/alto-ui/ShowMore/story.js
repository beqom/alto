/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

import ShowMore from './ShowMore';

const longText = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Cras aliquet neque et mi rutrum, sed fermentum risus hendrerit.
Nullam efficitur quam ac laoreet ultricies.
Suspendisse posuere tellus in interdum ornare.
Nunc dui felis, venenatis in tincidunt vitae, commodo sed libero.
Nunc pellentesque ex sit amet ante ultricies aliquam. Nunc eu enim sapien.
Aliquam ultricies facilisis nulla, in hendrerit augue euismod interdum.
Maecenas purus nisi, vehicula in augue ac, euismod tincidunt nunc.
`;

storiesOf('ShowMore', module)
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <div style={{ width: 400 }}>
      <ShowMore labelToOpen="Show long text" labelToClose="Hide long text">
        {longText}
      </ShowMore>
    </div>
  ));
