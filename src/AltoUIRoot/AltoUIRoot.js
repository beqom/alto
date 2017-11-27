import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../theme';
import { getColor } from '../helpers/theme';

const RootWrapper = ({ children }) => children;

const resetCssCode = `
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0
  }
`;

const AltoUIRoot = ({ children, theme, resetCSS }) => (
  <RootWrapper>
    <style>
      {resetCSS ? resetCssCode : ''}
      {`
        html {
          font-size: ${theme.fontSize.root};
          font-family: 'Source Sans Pro', sans-serif;
          color: ${getColor('text')({ theme })};
          background: white;
          line-height: 1.2;
        }

        a {
          text-decoration: none;
        }
      `}
    </style>
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  </RootWrapper>
);


AltoUIRoot.defaultProps = {
  theme: defaultTheme,
  resetCSS: false,
};

AltoUIRoot.propTypes = {
  children: PropTypes.any.isRequired,
  theme: PropTypes.object,
  resetCSS: PropTypes.bool,
}

export default AltoUIRoot;
