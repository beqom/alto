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
    <StateFullColorPicker value="dodgerblue">
      {(value, onChange) => (
        <div style={{ display: 'flex' }}>
          <ColorPicker
            name="alto-colorpicker"
            id="tomato"
            color="tomato"
            label="Red"
            onChange={() => onChange('tomato')}
            checked={value === 'tomato'}
          />
          <ColorPicker
            name="alto-colorpicker"
            id="mediumseagreen"
            color="mediumseagreen"
            label="Green"
            onChange={() => onChange('mediumseagreen')}
            checked={value === 'mediumseagreen'}
          />
          <ColorPicker
            name="alto-colorpicker"
            id="dodgerblue"
            color="dodgerblue"
            label="Blue"
            onChange={() => onChange('dodgerblue')}
            checked={value === 'dodgerblue'}
          />
          <ColorPicker
            name="alto-colorpicker"
            id="darkviolet"
            color="darkviolet"
            label="Purple"
            onChange={() => onChange('darkviolet')}
            checked={value === 'darkviolet'}
          />
        </div>
      )}
    </StateFullColorPicker>
  ));
