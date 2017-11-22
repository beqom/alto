import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { getColor, getTheme, fontSize } from '../../helpers/theme';

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';

const CheckBoxWrapper = styled.div`
  margin-bottom: 10px;
`;

CheckBoxWrapper.displayName = 'CheckBoxWrapper';

const CheckBoxInput = styled.input`
  opacity: 0;
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
`;

CheckBoxInput.displayName = 'CheckBoxInput';

const CheckBoxLabel = styled.label`
  ${fontSize('medium')};
  padding-left: 1.6em;
  position: relative;
  outline: 0;

  ::before,
  ::after {
    position: absolute;
    content: "";
    display: inline-block;
    transition:
      background-color ${getTheme('transition')},
      box-shadow ${getTheme('transition')},
      border-color ${getTheme('transition')};
  }

  ::before {
    left: 0;
    border: 1px solid ${getColor('coolGrey.20')};
    background-color: white;
    height: .875em;
    width: .875em;
    border-radius: ${getTheme('borderRadius')};

    ${modifier('checked')(css`
      border-color: ${getColor('primary')};
      background-color: ${getColor('primary')};
    `)};

    ${modifier('disabled')(css`
      background-color: ${getColor('coolGrey.10')};
    `)};

    ${modifier('checked', 'disabled')(css`
      border-color: ${getColor('coolGrey.20')};
      background-color: ${getColor('coolGrey.10')};
    `)};
  }

  input:focus + & {
    ::before {
      box-shadow: 0 0 0 3px ${getColor('primary.20')};
    }
  }

  ::after {
    ${modifier('checked')(css`
      transform: rotate(-45deg);
      left: .25em;
      top: .32em;
      height: .2em;
      width: .4em;
      border-left: 2px solid white;
      border-bottom: 2px solid white;
    `)};

    ${modifier('checked', 'disabled')(css`
      border-left: 2px solid ${getColor('coolGrey.30')};
      border-bottom: 2px solid ${getColor('coolGrey.30')};
    `)};
  }
`;

CheckBoxLabel.displayName = 'CheckBoxLabel';

const CheckBox = props => {
  const { checked, disabled } = props;
  return (
    <CheckBoxWrapper>
      <CheckBoxInput {...props} type="radio" />
      <CheckBoxLabel htmlFor={props.id} {...{ checked, disabled }}>{props.label}</CheckBoxLabel>
    </CheckBoxWrapper>
  );
}

CheckBox.defaultProps = {
  checked: false,
  disabled: false,
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default CheckBox;
