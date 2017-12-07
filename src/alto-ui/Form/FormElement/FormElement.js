import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { getColor, fontSize } from '../../helpers/theme';

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';


const FormElementWrapper = styled.div`
  margin-bottom: 20px;
`;

const FormElementHelpText = styled.div`
  ${fontSize('small')};
  text-align: left;
  font-weight: 600;
  padding: 10px 0;
  color: ${getColor('coolGrey.50')};

  ${modifier('success')(css`
    color: ${getColor('success')};
  `)} ${modifier('error')(css`
      color: ${getColor('error')};
    `)} ${modifier('disabled')(css`
      color: ${getColor('coolGrey.20')};
    `)};
`;

const FormElementLabel = styled.label`
  ${fontSize('small')};
  font-weight: 700;
  color: ${getColor('coolGrey.50')};
  text-align: left;
  padding-bottom: 10px;
  display: block;
`;

const FormElement = props => {
  const { error, disabled, success, id, children } = props;
  return (
    <FormElementWrapper>
      <FormElementLabel htmlFor={id} id={`${id}__label`} {...{ error, disabled, success }}>
        {props.label}
      </FormElementLabel>
      {children}
      {props.helpText && (
        <FormElementHelpText id={`${id}__help-text`} {...{ error, disabled, success }}>
          {props.helpText}
        </FormElementHelpText>
      )}
    </FormElementWrapper>
  );
};

FormElement.propTypes = {
  helpText: PropTypes.string,
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  success: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

export default FormElement;
