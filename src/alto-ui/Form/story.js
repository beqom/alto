/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';
import centered from '@storybook/addon-centered';

// import { text, boolean, select } from '@storybook/addon-knobs';

import Checkbox from './CheckBox';
import Radio from './Radio';
import Select from './Select';
import TextArea from './TextArea';
import TextField from './TextField';
import Button from '../Button';

const Form = styled.form`
  width: 600px;
`;

Form.displayName = 'form';

storiesOf('Form/Overview', module)
  .addDecorator(centered)
  .addWithJSX('Static example', () => (
    <Form>
      <TextField id="firtsname" label="First name" placeholder="First name" />
      <TextField id="lastname" label="Last name" placeholder="Last name" />
      <TextField id="email" label="Email" type="email" placeholder="example@domain.com" />
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
      <br />
      <Radio id="male" label="Male" name="gender" checked />
      <Radio id="female" label="Female" name="gender" />
      <br />
      <TextArea id="bio" label="Bio" placeholder="Write something about yourself..." />
      <br />
      <Checkbox id="accept-term" label="I accept the Terms of Service" />
      <Checkbox id="subscribed" label="Subcribe me to the newsletter" checked />
      <br />
      <Button type="submit">Submit</Button>
    </Form>
  ));

require('./CheckBox/story');
require('./ColorPicker/story');
require('./DatePicker/story');
require('./FileInput/story');
require('./Label/story');
require('./Radio/story');
require('./Select/story');
require('./Switch/story');
require('./TextArea/story');
require('./TextField/story');
