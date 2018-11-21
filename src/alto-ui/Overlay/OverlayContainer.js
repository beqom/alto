import React from 'react';
import PropTypes from 'prop-types';

import Overlay from './Overlay';

const OverlayContext = React.createContext();

const noop = () => {};

class OverlayContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      listOfChilrenOverlays: [this],
    };

    this.pushOverlay = this.pushOverlay.bind(this);
    this.pushOverlayInContext = this.pushOverlayInContext.bind(this);
    this.removeOverlayFromContext = noop;
  }

  getCurrentFromState() {
    return this.state.listOfChilrenOverlays.slice(-1)[0];
  }

  pushOverlay(overlay) {
    this.setState(({ listOfChilrenOverlays }) => ({
      listOfChilrenOverlays: [...listOfChilrenOverlays, overlay],
    }));
    return () =>
      this.setState(({ listOfChilrenOverlays }) => ({
        listOfChilrenOverlays: listOfChilrenOverlays.filter(o => o !== overlay),
      }));
  }

  pushOverlayInContext() {
    const { context } = this.props;
    this.removeOverlayFromContext = context ? context.pushOverlay(this) : noop;
  }

  renderOverlay() {
    const { context, inert, ...props } = this.props;

    const currentOverlay = context ? context.current : this.getCurrentFromState();

    return (
      <Overlay
        {...props}
        pushOverlay={this.pushOverlayInContext}
        removeOverlay={this.removeOverlayFromContext}
        inert={inert || currentOverlay !== this}
      />
    );
  }

  render() {
    const { context } = this.props;
    if (context) return this.renderOverlay();

    // No context: let's provide one to futur overlay children

    return (
      <OverlayContext.Provider
        value={{
          pushOverlay: this.pushOverlay,
          current: this.getCurrentFromState(),
        }}
      >
        {this.renderOverlay()}
      </OverlayContext.Provider>
    );
  }
}

OverlayContainer.displayName = 'OverlayContainer';

OverlayContainer.defaultProps = {
  inert: false,
};

OverlayContainer.propTypes = {
  context: PropTypes.shape({
    pushOverlay: PropTypes.func.isRequired,
    current: PropTypes.object.isRequired,
  }),
  inert: PropTypes.bool,
};

export default props => (
  <OverlayContext.Consumer>
    {context => <OverlayContainer {...props} context={context} />}
  </OverlayContext.Consumer>
);
