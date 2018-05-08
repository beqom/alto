import React from 'react';
import PropTypes from 'prop-types';

import './Radio.scss';

// import styled, { css } from 'styled-components';

// import { getColor, getTheme, fontSize } from '../../helpers/theme';
//
// const modifier = (...ms) => val => props =>
//   ms.reduce((acc, m) => acc && props[m], true) ? val : '';
//
// const RadioWrapper = styled.div`
//   margin-bottom: 10px;
// `;
//
// RadioWrapper.displayName = 'RadioWrapper';
//
// const RadioInput = styled.input`
//   opacity: 0;
//   position: absolute;
//   height: 1px;
//   width: 1px;
//   overflow: hidden;
//   clip: rect(1px, 1px, 1px, 1px);
// `;
//
// RadioInput.displayName = 'RadioInput';
//
// const RadioLabel = styled.label`
//   ${fontSize('medium')};
//   padding-left: 1.6em;
//   position: relative;
//
//   ::before,
//   ::after {
//     position: absolute;
//     content: '';
//     display: inline-block;
//     left: 0;
//     height: 0.875em;
//     width: 0.875em;
//     border-radius: 50%;
//     transition: background-color ${getTheme('transition')}, box-shadow ${getTheme('transition')},
//       border-color ${getTheme('transition')};
//   }
//
//   ::before {
//     border: 1px solid ${getColor('coolGrey.20')};
//     background-color: white;
//     transition: background-color ${getTheme('transition')}, box-shadow ${getTheme('transition')},
//       border-color ${getTheme('transition')};
//
//     ${modifier('checked')(css`
//       border-color: transparent;
//       background-color: transparent;
//     `)};
//
//     ${modifier('disabled')(css`
//       background-color: ${getColor('coolGrey.10')};
//     `)};
//   }
//
//   input:focus + & {
//     ::before {
//       box-shadow: 0 0 0 3px ${getColor('primary.20')};
//     }
//   }
//
//   ::after {
//     border: 1px solid transparent;
//
//     ${modifier('checked')(css`
//       border-color: ${getColor('primary')};
//       background-color: white;
//       box-shadow: inset 0 0 0 0.25em ${getColor('primary')};
//     `)};
//
//     ${modifier('checked', 'disabled')(css`
//       border-color: ${getColor('coolGrey.20')};
//       background-color: ${getColor('coolGrey.30')};
//       box-shadow: inset 0 0 0 0.25em ${getColor('coolGrey.10')};
//     `)};
//   }
// `;
//
// RadioLabel.displayName = 'RadioLabel';
//
// const Radio = props => {
//   const { checked, disabled } = props;
//   return (
//     <RadioWrapper>
//       <RadioInput {...props} type="radio" />
//       <RadioLabel htmlFor={props.id} {...{ checked, disabled }}>
//         {props.label}
//       </RadioLabel>
//     </RadioWrapper>
//   );
// };

const Radio = props => {
  const { checked, disabled } = props;
  return (
    <div className="Radio">
      <input {...props} className="Radio__input" type="radio" />
      <label htmlFor={props.id} {...{ checked, disabled }} className="Radio__label">
        {props.label}
      </label>
    </div>
  );
};

Radio.defaultProps = {
  checked: false,
  disabled: false,
};

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Radio;
