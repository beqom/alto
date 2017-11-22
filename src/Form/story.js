/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
// import { text, boolean, select } from '@storybook/addon-knobs';

import Select from './Select';
import TextArea from './TextArea';
import TextField from './TextField';
import Button from '../Button';

const Form = styled.form`width: 600px;`;

Form.displayName = 'form';

storiesOf('Form/Overview', module).addWithJSX('Static example', () => (
  <Form>
    <TextField id="firtsname" label="First name" placeholder="First name" />
    <TextField id="lastname" label="Last name" placeholder="Last name" />
    <TextField  id="email" label="Email" type="email" placeholder="example@domain.com" />
    <TextField
      id="password"
      label="Password"
      type="password"
      placeholder="password"
      helpText="Use at least one lowercase letter, one numeral, and seven characters."
    />
    <Select
      label="Continent"
      id="continent"
      options={[
        'Asia',
        'Africa',
        'Antarctica',
        'Australia',
        'Europe',
        'North America',
        'South America',
      ]}
    />
    <TextArea id="bio" label="Bio" placeholder="Write something about yourself..." />
    <Button type="submit">Submit</Button>
  </Form>
));

require('./Select/story');
require('./TextArea/story');
require('./TextField/story');
