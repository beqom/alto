/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered/react';

import Line from './Line';

storiesOf('Line', module)
  .addDecorator(centered)
  .addWithJSX('default', () => {
    const props = {
      xxsmall: boolean('xxsmall', false),
      xsmall: boolean('xsmall', false),
      small: boolean('small', false),
      medium: boolean('medium', true),
      large: boolean('large', false),
      xlarge: boolean('xlarge', false),
      xxlarge: boolean('xxlarge', false),
    };
    return (
      <div style={{ width: 300, textAlign: 'justify' }}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ducimus. Molestiae
          rerum aut maxime deserunt laborum, laudantium, alias ea consectetur ipsum obcaecati quam
          nisi ab blanditiis totam provident sunt molestias?
        </div>
        <Line {...props} />
        <div>
          Necessitatibus ipsam dolore odio velit neque veniam provident fugiat facere. Quod
          consequatur doloribus vero ratione vel eaque amet, commodi! At cumque ab, architecto
          officiis! Cum fugiat eos assumenda fugit non.
        </div>
        <Line {...props} />
        <div>
          Doloribus eligendi sed deleniti sapiente excepturi, voluptas veniam ut voluptatem,
          perspiciatis dolore consequuntur eaque dolor qui at nemo in id, delectus cumque et
          obcaecati saepe non maxime recusandae! Animi, perferendis?
        </div>
      </div>
    );
  })
  .addWithJSX('vertical', () => {
    const props = {
      xxsmall: boolean('xxsmall', false),
      xsmall: boolean('xsmall', false),
      small: boolean('small', false),
      medium: boolean('medium', true),
      large: boolean('large', false),
      xlarge: boolean('xlarge', false),
      xxlarge: boolean('xxlarge', false),
    };
    return (
      <div style={{ width: 600, display: 'flex', textAlign: 'justify' }}>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem, ducimus. Molestiae
          rerum aut maxime deserunt laborum, laudantium, alias ea consectetur ipsum obcaecati quam
          nisi ab blanditiis totam provident sunt molestias?
        </div>
        <Line vertical {...props} />
        <div>
          Necessitatibus ipsam dolore odio velit neque veniam provident fugiat facere. Quod
          consequatur doloribus vero ratione vel eaque amet, commodi! At cumque ab, architecto
          officiis! Cum fugiat eos assumenda fugit non.
        </div>
        <Line vertical {...props} />
        <div>
          Doloribus eligendi sed deleniti sapiente excepturi, voluptas veniam ut voluptatem,
          perspiciatis dolore consequuntur eaque dolor qui at nemo in id, delectus cumque et
          obcaecati saepe non maxime recusandae! Animi, perferendis?
        </div>
      </div>
    );
  });
