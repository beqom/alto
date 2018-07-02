import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash.omit';

import Button from '../Button';
import CopyToClipboardIcon from '../Icons/CopyToClipboard';
import CheckIcon from '../Icons/Check';

const copyToClipboard = (str, node = document.body) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  node.appendChild(el);

  el.select();
  document.execCommand('copy');
  node.removeChild(el);
};

class CopyToClipboard extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.state = { succes: false };
    this.buttonRef = React.createRef();
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  handleClick() {
    if (typeof this.props.children === 'string') {
      copyToClipboard(this.props.children, this.buttonRef.current);
      this.buttonRef.current.focus();

      this.setState(() => ({ succes: true }));

      this.timeout = setTimeout(() => this.setState({ succes: false }), this.props.timer);
    }
  }

  render() {
    return (
      <Button
        buttonRef={this.buttonRef}
        {...omit(this.props, ['succesLabel', 'label'])}
        onClick={this.handleClick}
      >
        {this.state.succes ? <CheckIcon left /> : <CopyToClipboardIcon left />}
        {this.state.succes && this.props.succesLabel ? this.props.succesLabel : this.props.label}
      </Button>
    );
  }
}

CopyToClipboard.defaultProps = {
  timer: 2000,
};

CopyToClipboard.propTypes = {
  label: PropTypes.string.isRequired,
  succesLabel: PropTypes.string,
  children: PropTypes.string.isRequired,
  timer: PropTypes.number,
};

CopyToClipboard.displayName = 'CopyToClipboard';

export default CopyToClipboard;
