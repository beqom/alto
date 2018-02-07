/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import withReadme from 'storybook-readme/with-readme';
import centered from '@storybook/addon-centered';

import ColorPicker from './ColorPicker';
import README from './README.md';

class StateFullColorPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
  }

  render() {
    return this.props.children(this.state.value, this.handleChange);
  }
}

StateFullColorPicker.propTypes = {
  value: PropTypes.string,
  children: PropTypes.func,
};

storiesOf('Form/ColorPicker', module)
  .addDecorator(withReadme(README))
  .addDecorator(centered)
  .addWithJSX('playground', () => (
    <StateFullColorPicker value="blue">
      {(value, onChange) => (
        <div style={{ display: 'flex' }}>
          {[
            'red',
            'orange',
            'yellow',
            'lime',
            'green',
            'pine',
            'teal',
            'blue',
            'indigo',
            'purple',
            'pink',
            'white',
            'grey',
            'black',
          ].map(color => (
            <ColorPicker
              name="alto-colorpicker"
              id={color}
              key={color}
              color={color}
              onChange={() => onChange(color)}
              checked={value === color}
            />
          ))}
        </div>
      )}
    </StateFullColorPicker>
  ));
