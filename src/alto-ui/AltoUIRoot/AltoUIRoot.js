import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

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
    const { resetCSS } = this.props;
    const css = `
      ${resetCSS ? resetCssCode : ''}

      html {
        font-size: 16px;
        font-family: 'Source Sans Pro', sans-serif;
        color: #333c48;
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
    const { children } = this.props;
    return <Fragment>{children}</Fragment>;
  }
}

AltoUIRoot.defaultProps = {
  resetCSS: false,
};

AltoUIRoot.propTypes = {
  children: PropTypes.any.isRequired,
  resetCSS: PropTypes.bool,
};

export default AltoUIRoot;
