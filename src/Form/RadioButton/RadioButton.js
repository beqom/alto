import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { getColor, fontSize } from '../../helpers/theme';

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';

const RadioButtonWrapper = styled.div`
  margin-bottom: 10px;
`;

RadioButtonWrapper.displayName = 'RadioButtonWrapper';

const RadioButtonInput = styled.input`
  opacity: 0;
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

RadioButtonInput.displayName = 'RadioButtonInput';

const RadioButtonLabel = styled.label`
  ${fontSize('medium')};
  padding-left: 1.6em;
  position: relative;

  ::before {
    position: absolute;
    content: "";
    display: inline-block;
  }

  ::before {
    left: 0;
    border: 1px solid ${getColor('coolGrey.20')};
    background-color: white;
    height: .875em;
    width: .875em;
    border-radius: 50%;

    ${modifier('checked')(css`
      border-color: ${getColor('primary')};
      box-shadow: inset 0 0 0 .25em ${getColor('primary')};
    `)};

    ${modifier('disabled')(css`
      background-color: ${getColor('coolGrey.10')};
    `)};

    ${modifier('checked', 'disabled')(css`
      border-color: ${getColor('coolGrey.20')};
      background-color: ${getColor('coolGrey.30')};
      box-shadow: inset 0 0 0 .25em ${getColor('coolGrey.10')};
    `)};
  }
`;

RadioButtonLabel.displayName = 'RadioButtonLabel';

const RadioButton = props => {
  const { checked, disabled } = props;
  return (
    <RadioButtonWrapper>
      <RadioButtonInput {...props} type="radio" />
      <RadioButtonLabel htmlFor={props.id} {...{ checked, disabled }}>{props.label}</RadioButtonLabel>
    </RadioButtonWrapper>
  );
}

RadioButton.defaultProps = {
  checked: false,
  disabled: false,
};

RadioButton.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default RadioButton;
