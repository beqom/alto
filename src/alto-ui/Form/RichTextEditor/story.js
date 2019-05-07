/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import centered from '@storybook/addon-centered';
import { boolean, text } from '@storybook/addon-knobs';

import RichTextEditorStateLess from './RichTextEditor';

function RichTextEditor(props) {
  const [value, setValue] = useState(props.value);
  return (
    <div style={{ width: 400 }}>
      <RichTextEditorStateLess {...props} value={value} onChange={setValue} />
    </div>
  );
}

const initialValue = `
  <h1>Lorem ipsum dolor sit amet</h1>
  <p><br /></p>
  <h2>Consectetur adipiscing elit.</h2>
  <p><br /></p>
  <p>
    Sed eu augue mauris. Aliquam eget blandit felis.<em> Etiam id pharetra mi</em>. Nunc aliquet, mi
    nec euismod <strong>finibus, ipsum nibh</strong> porttitor eros, eu ornare neque ligula non elit:
  </p>
  <ol>
    <li>Suspendisse potenti.</li>
    <li>Morbi vel pellentesque metus.</li>
    <li>Donec sit amet condimentum dui.</li>
  </ol>
  <p><br /></p>
  <h2>Sed ornare vestibulum metus, sit amet faucibus lorem placerat vitae.</h2>
  <p>Proin in libero consequat,<strong> hendrerit </strong>massa id, convallis elit.</p>
  <ul>
    <li>Sed vehicula lectus et diam dictum ornare.</li>
    <li class="ql-indent-1">Donec vel <s>magna velit. Integer in</s> felis urna.</li>
    <li class="ql-indent-1">Nunc condimentum sed nibh et laoreet.</li>
    <li>
      Phasellus magna purus, <a href="http://www.google.fr">interdum</a> a semper eget, lacinia sit
      amet justo.
    </li>
    <li>Sed vitae mauris augue.</li>
  </ul>
  <p><br /></p>
  <p>
    Cras sit amet posuere tellus, a condimentum lacus. Etiam quam urna, pellentesque a elit id, mattis
    tincidunt libero. In hac habitasse platea dictumst. Integer feugiat, nulla nec aliquet faucibus,
    lacus metus consectetur velit, vitae fermentum felis libero eget tellus.
  </p>
`;

storiesOf('Form/RichTextEditor', module)
  .addDecorator(centered)
  .addWithJSX('overview', () => (
    <RichTextEditor
      value={initialValue}
      hasToolbar={boolean('hasToolbar', false)}
      oneline={boolean('oneline', false)}
      full={boolean('full', true)}
      inline={boolean('inline', undefined)}
      bold={boolean('bold', undefined)}
      italic={boolean('italic', undefined)}
      strike={boolean('strike', undefined)}
      link={boolean('link', undefined)}
      header={boolean('header', undefined)}
      list={boolean('list', undefined)}
      readonly={boolean('readonly', undefined)}
      disabled={boolean('disabled', undefined)}
      placeholder={text('placeholder', 'Type something here...')}
      mentions={
        boolean('mentions', false)
          ? [
              { id: '1', value: 'Superman' },
              { id: '2', value: 'Batman' },
              { id: '3', value: 'Spiderman' },
              { id: '4', value: 'IronMan' },
              { id: '5', value: 'Wonder Woman' },
              { id: '6', value: 'Hulk' },
              { id: '7', value: 'Captain America' },
            ]
          : null
      }
    />
  ));
