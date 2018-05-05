import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import defaultTheme from '../theme';
import { getColor } from '../helpers/theme';

const resetCssCode = `
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0
  }

  a {
    text-decoration: none;
    outline: 0;
  }
`;

class AltoUIRoot extends React.PureComponent {
  constructor(props) {
    super(props);

    this.addStyles();
  }

  addStyles() {
    const { theme, resetCSS } = this.props;
    const css = `
      ${resetCSS ? resetCssCode : ''}

      html {
        font-size: ${theme.fontSize.root};
        font-family: 'Source Sans Pro', sans-serif;
        color: ${getColor('text')({ theme })};
        background: white;
        line-height: 1.2;
        overflow: hidden;
      }
    `;
    const id = 'alto-ui-root-styles';
    const styleElt = document.getElementById(id);

    if (styleElt) {
      styleElt.innerHTML = css;
    } else {
      const styleNewElt = document.createElement('style');
      styleNewElt.id = id;
      styleNewElt.type = 'text/css';
      styleNewElt.appendChild(document.createTextNode(css));
      document.head.appendChild(styleNewElt);
    }
  }

  render() {
    const { children, theme } = this.props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
}

AltoUIRoot.defaultProps = {
  theme: defaultTheme,
  resetCSS: false,
};

AltoUIRoot.propTypes = {
  children: PropTypes.any.isRequired,
  theme: PropTypes.object,
  resetCSS: PropTypes.bool,
};

export default AltoUIRoot;
