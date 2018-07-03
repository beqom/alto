import React from 'react';
import PropTypes from 'prop-types';

const isModifiedEvent = event =>
  !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

class Link extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (this.props.onClick) this.props.onClick(event);

    if (!this.context.router) return;

    if (
      !event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      !this.props.target && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
    ) {
      event.preventDefault();

      const { history } = this.context.router;
      history.push(this.props.href);
    }
  }

  render() {
    const { href, linkRef, ...props } = this.props;

    return (
      <a {...props} onClick={this.handleClick} href={href} ref={linkRef}>
        {this.props.children}
      </a>
    );
  }
}

Link.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string.isRequired,
  linkRef: PropTypes.object,
  children: PropTypes.any,
  target: PropTypes.string,
};

Link.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  }),
};

export default Link;
