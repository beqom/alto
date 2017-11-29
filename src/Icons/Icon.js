import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const modifier = (...ms) => val => props =>
  ms.reduce((acc, m) => acc && props[m], true) ? val : '';

const IconContainer = styled.i.attrs({
  baseline: p => p.baseline || p.left || p.right || p.top || p.bottom,
})`
  display: inline-flex;
  align-self: center;
  position: relative;
  height: ${({ size }) => size};
  width: ${({ size }) => size};
  font-size: ${({ size }) => size};

  ${modifier('baseline')(`
    svg {
      bottom: -.2em;
      position: absolute;
    }
  `)}

  ${modifier('left')('margin-right: 10px;')}
  ${modifier('right')('margin-left: 10px;')}
`;

IconContainer.displayName = 'IconContainer';

const Icon = props => {
  const { left, right  } = props;
  const baseline = props.baseline || left || right;
  const size = props.size || ( baseline ? '1.2em' : '1em' );
  return (
    <IconContainer {...props} baseline={baseline} size={size}>
      <svg
        version="1.1"
        viewBox={props.viewBox}
        width="1em"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        {props.children({
          fill: props.color,
        })}
      </svg>
    </IconContainer>
  );
}

Icon.defaultProps = {
  size: null,
  viewBox: '0 0 36 36',
  outline: false,
  color: 'currentColor',
  baseline: false,
  left: false,
  right: false,
};

Icon.propTypes = {
  children: PropTypes.func.isRequired,
  outline: PropTypes.bool,
  viewBox: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  baseline: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
};

export default Icon;
