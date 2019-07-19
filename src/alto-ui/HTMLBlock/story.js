/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered/react';

import HTMLBlock from './HTMLBlock';

const text = `
<h1>This is heading 1</h1>
<h2>This is heading 2</h2>
<p>Here is a first <strong>paragraph</strong> of text. </p>
<p>Here is a second <em>paragraph</em> of text.</p>
<p>Here is a third paragraph of text with a link to <a href="www.google.com">google</a> website.</p>
`;

storiesOf('HTMLBlock', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => <HTMLBlock style={{ width: 600 }} html={text} />);
