/* eslint-disable import/no-extraneous-dependencies, react/prop-types */
import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { boolean } from '@storybook/addon-knobs';
import centered from '@storybook/addon-centered';

import TagInputWithoutValue from './TagInput';

function TagInput({ initialValue, ...props }) {
  const [value, setValue] = useState(initialValue);

  return (
    <div style={{ width: 400 }}>
      <TagInputWithoutValue
        rounded={boolean('rounded', false)}
        disabled={boolean('disabled', false)}
        {...props}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

const tagsNum = [...Array(50).keys()].map(n => `${n + 1}`.padStart(3, '0'));

storiesOf('Form/TagInput', module)
  .addDecorator(centered)
  .addWithJSX('simple', () => <TagInput initialValue={['foo', 'bar', 'baz']} />)
  .addWithJSX('remaing tags', () => (
    <TagInput
      initialValue={tagsNum.filter(() => Math.random() > 0.5)}
      availableTags={() => tagsNum}
    />
  ))
  .addWithJSX('custom validation (only accept number)', () => (
    <TagInput
      match={(value, tags) =>
        !tags.includes(parseInt(value, 10)) && `${parseInt(value, 10)}` === value
      }
      onNewTag={(value, add) => add(parseInt(value, 10))}
      initialValue={[101, 14, 56]}
    />
  ));
